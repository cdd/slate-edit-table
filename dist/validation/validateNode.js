'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slate = require('slate');

var _immutable = require('immutable');

var _utils = require('../utils');

/**
 * Returns a validateNode function, handling validation specific to tables that
 * cannot be expressed using the schema.
 */


// Old format for Slate rules
function validateNode(opts) {
    var rules = [noBlocksWithinCell(opts), cellsWithinTable(opts), rowsWithinTable(opts), tablesContainOnlyRows(opts), rowsContainRequiredColumns(opts), tableContainAlignData(opts), tableContainWidthsData(opts), tableDataHasValidWidths(opts)];
    var validators = rules.map(toValidateNode);

    return function validateTableNode(node) {
        var changer = void 0;
        validators.find(function (validator) {
            changer = validator(node);
            return Boolean(changer);
        });

        return changer;
    };
}

// Convert an old rule definition to an individual plugin with on "validateNode"

function toValidateNode(rule) {
    return function validateRule(node) {
        if (!rule.match(node)) {
            return undefined;
        }
        var validationResult = rule.validate(node);
        if (validationResult == null) {
            return undefined;
        }

        return function (change) {
            return rule.normalize(change, node, validationResult);
        };
    };
}

/**
 * Rule to enforce cells only contain inlines or text.
 * It unwrap blocks in cell blocks
 */
function noBlocksWithinCell(opts) {
    return {
        match: function match(node) {
            return node.object == 'block' && node.type == opts.typeCell;
        },


        // Find nested blocks
        validate: function validate(node) {
            var nestedBlocks = node.nodes.filter(function (child) {
                return child.object === 'block';
            });

            return nestedBlocks.size > 0 ? nestedBlocks : null;
        },


        // If any, unwrap all nested blocks
        normalize: function normalize(change, node, nestedBlocks) {
            nestedBlocks.forEach(function (block) {
                return block.nodes.forEach(function (grandChild) {
                    change.unwrapNodeByKey(grandChild.key, {
                        normalize: false
                    });
                });
            });

            return change;
        }
    };
}

/**
 * Rule to enforce cells are always surrounded by a row.
 */
function cellsWithinTable(opts) {
    return {
        match: function match(node) {
            return (node.object === 'document' || node.object === 'block') && node.type !== opts.typeRow;
        },


        // Find child cells nodes not in a row
        validate: function validate(node) {
            var cells = node.nodes.filter(function (n) {
                return n.type === opts.typeCell;
            });

            if (cells.isEmpty()) {
                return undefined;
            }

            return {
                cells: cells
            };
        },


        // If any, wrap all cells in a row block
        normalize: function normalize(change, node, _ref) {
            var cells = _ref.cells;

            cells.forEach(function (cell) {
                return change.wrapBlockByKey(cell.key, opts.typeRow, {
                    normalize: false
                });
            });

            return change;
        }
    };
}

/**
 * Rule to enforce rows are always surrounded by a table.
 */
function rowsWithinTable(opts) {
    return {
        match: function match(node) {
            return (node.object === 'document' || node.object === 'block') && node.type !== opts.typeTable;
        },


        // Find child cells nodes not in a row
        validate: function validate(node) {
            var rows = node.nodes.filter(function (n) {
                return n.type === opts.typeRow;
            });

            if (rows.isEmpty()) {
                return undefined;
            }

            return {
                rows: rows
            };
        },


        // If any, wrap all cells in a row block
        normalize: function normalize(change, node, _ref2) {
            var rows = _ref2.rows;

            rows.forEach(function (row) {
                return change.wrapBlockByKey(row.key, {
                    type: opts.typeTable,
                    data: {
                        presetAlign: (0, _utils.createAlign)(row.nodes.size),
                        widths: (0, _utils.createWidths)(row.nodes.size)
                    }
                }, { normalize: false });
            });

            return change;
        }
    };
}

/**
 * Rule that ensures tables only contain rows and at least one.
 */
function tablesContainOnlyRows(opts) {
    var isRow = function isRow(node) {
        return node.type === opts.typeRow;
    };

    return {
        match: function match(node) {
            return node.type === opts.typeTable;
        },
        validate: function validate(table) {
            // Figure out invalid rows
            var invalids = table.nodes.filterNot(isRow);

            // Figure out valid rows
            var add = invalids.size === table.nodes.size ? [makeEmptyRow(opts)] : [];

            if (invalids.isEmpty() && add.length === 0) {
                return null;
            }

            return {
                invalids: invalids,
                add: add
            };
        },


        /**
         * Replaces the node's children
         */
        normalize: function normalize(change, node, _ref3) {
            var _ref3$invalids = _ref3.invalids,
                invalids = _ref3$invalids === undefined ? [] : _ref3$invalids,
                _ref3$add = _ref3.add,
                add = _ref3$add === undefined ? [] : _ref3$add;

            // Remove invalids
            invalids.forEach(function (child) {
                return change.removeNodeByKey(child.key, { normalize: false });
            });

            // Add valids
            add.forEach(function (child) {
                return change.insertNodeByKey(node.key, 0, child, { normalize: false });
            });

            return change;
        }
    };
}

/**
 * A rule that ensures rows contains only cells, and
 * as much cells as there is columns in the table.
 */
function rowsContainRequiredColumns(opts) {
    var isRow = function isRow(node) {
        return node.type === opts.typeRow;
    };
    var isCell = function isCell(node) {
        return node.type === opts.typeCell;
    };
    var countCells = function countCells(row) {
        return row.nodes.count(isCell);
    };

    return {
        match: function match(node) {
            return node.type === opts.typeTable;
        },
        validate: function validate(table) {
            var rows = table.nodes.filter(isRow);

            // The number of column this table has
            var columns = rows.reduce(function (count, row) {
                return Math.max(count, countCells(row));
            }, 1); // Min 1 column

            // else normalize, by padding with empty cells
            var invalidRows = rows.map(function (row) {
                var cells = countCells(row);
                var invalids = row.nodes.filterNot(isCell);

                // Row is valid: right count of cells and no extra node
                if (invalids.isEmpty() && cells === columns) {
                    return null;
                }

                // Otherwise, remove the invalids and append the missing cells
                return {
                    row: row,
                    invalids: invalids,
                    add: columns - cells
                };
            }).filter(Boolean);

            return invalidRows.size > 0 ? invalidRows : null;
        },


        /**
         * Updates by key every given nodes
         */
        normalize: function normalize(change, node, rows) {
            rows.forEach(function (_ref4) {
                var row = _ref4.row,
                    invalids = _ref4.invalids,
                    add = _ref4.add;

                invalids.forEach(function (child) {
                    change.removeNodeByKey(child.key, { normalize: false });
                });

                (0, _immutable.Range)(0, add).forEach(function () {
                    var cell = makeEmptyCell(opts);
                    change.insertNodeByKey(row.key, 0, cell, {
                        normalize: false
                    });
                });
            });

            return change;
        }
    };
}

/**
 * A rule that ensures table node has all align data
 */
function tableContainAlignData(opts) {
    return {
        match: function match(node) {
            return node.type === opts.typeTable;
        },
        validate: function validate(table) {
            var presetAlign = table.data.get('presetAlign', []);
            var row = table.nodes.first();
            var columns = row.nodes.size;

            return presetAlign.length == columns ? null : { presetAlign: presetAlign, columns: columns };
        },


        /**
         * Updates by key the table to add the data
         */
        normalize: function normalize(change, node, _ref5) {
            var presetAlign = _ref5.presetAlign,
                columns = _ref5.columns;

            return change.setNodeByKey(node.key, {
                data: node.data.set('presetAlign', (0, _utils.createAlign)(columns, presetAlign))
            }, { normalize: false });
        }
    };
}

function tableContainWidthsData(opts) {
    return {
        match: function match(node) {
            return node.type === opts.typeTable;
        },
        validate: function validate(table) {
            var widths = table.data.get('widths', []);
            var columns = table.nodes.first().nodes.size;

            return widths.length == columns ? null : { widths: widths, columns: columns };
        },


        /**
         * Updates by key the table to add the data
         */
        normalize: function normalize(change, node, _ref6) {
            var widths = _ref6.widths,
                columns = _ref6.columns;

            var data = node.data.set('widths', (0, _utils.createWidths)(columns, widths));

            return change.setNodeByKey(node.key, { data: data }, { normalize: false });
        }
    };
}

function tableDataHasValidWidths(opts) {
    return {
        match: function match(node) {
            return node.type === opts.typeTable;
        },
        validate: function validate(table) {
            if (typeof opts.minWidth === 'undefined') {
                return null;
            }

            var widths = table.data.get('widths');
            var invalidIndices = widths.reduce(function (memo, width, index) {
                if (width < opts.minWidth) {
                    memo.push(index);
                }

                return memo;
            }, []);

            return invalidIndices.length ? invalidIndices : null;
        },
        normalize: function normalize(change, node, invalidIndices) {
            var data = node.data;
            var widths = data.get('widths').slice();

            invalidIndices.forEach(function (index) {
                widths[index] = opts.minWidth;
            });

            data = data.set('widths', widths);

            return change.setNodeByKey(node.key, { data: data }, { normalize: false });
        }
    };
}

function makeEmptyCell(opts) {
    return _slate.Block.create({
        type: opts.typeCell,
        nodes: (0, _immutable.List)([_slate.Text.create('')])
    });
}

function makeEmptyRow(opts) {
    return _slate.Block.create({
        type: opts.typeRow,
        nodes: (0, _immutable.List)([makeEmptyCell(opts)])
    });
}

exports.default = validateNode;