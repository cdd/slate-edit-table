'use strict';

var Slate = require('slate');

var _require = require('immutable'),
    Range = _require.Range,
    List = _require.List;

var createAlign = require('./createAlign');
var createWidths = require('./createWidths');

/**
 * Create a schema for tables
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A schema definition with rules to normalize tables
 */
function makeSchema(opts) {
    return {
        rules: [cellsWithinTable(opts), rowsWithinTable(opts), tablesContainOnlyRows(opts), rowsContainRequiredColumns(opts), tableContainAlignData(opts), tableContainWidthsData(opts), tableDataHasValidWidths(opts)]
    };
}

/**
 * Rule to enforce cells are always surrounded by a row.
 *
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A rule to ensure cells are always surrounded by a row.
 */
function cellsWithinTable(opts) {
    return {
        match: function match(node) {
            return (node.kind === 'document' || node.kind === 'block') && node.type !== opts.typeRow;
        },


        // Find child cells nodes not in a row
        validate: function validate(node) {
            var cells = node.nodes.filter(function (n) {
                return n.type === opts.typeCell;
            });

            if (cells.isEmpty()) return;

            return {
                cells: cells
            };
        },


        // If any, wrap all cells in a row block
        normalize: function normalize(transform, node, _ref) {
            var cells = _ref.cells;

            transform = cells.reduce(function (tr, cell) {
                return tr.wrapBlockByKey(cell.key, opts.typeRow, { normalize: false });
            }, transform);

            return transform;
        }
    };
}

/**
 * Rule to enforce rows are always surrounded by a table.
 *
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A rule to ensure rows are always surrounded by a table.
 */
function rowsWithinTable(opts) {
    return {
        match: function match(node) {
            return (node.kind === 'document' || node.kind === 'block') && node.type !== opts.typeTable;
        },


        // Find child cells nodes not in a row
        validate: function validate(node) {
            var rows = node.nodes.filter(function (n) {
                return n.type === opts.typeRow;
            });

            if (rows.isEmpty()) return;

            return {
                rows: rows
            };
        },


        // If any, wrap all cells in a row block
        normalize: function normalize(transform, node, _ref2) {
            var rows = _ref2.rows;

            transform = rows.reduce(function (tr, row) {
                return tr.wrapBlockByKey(row.key, {
                    type: opts.typeTable,
                    data: {
                        align: createAlign(row.nodes.size),
                        widths: createWidths(rows.size)
                    }
                }, { normalize: false });
            }, transform);

            return transform;
        }
    };
}

/**
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A rule that ensures tables only contain rows and
 * at least one.
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
         * @param {List<Nodes>} value.nodes
         */
        normalize: function normalize(transform, node, _ref3) {
            var _ref3$invalids = _ref3.invalids,
                invalids = _ref3$invalids === undefined ? [] : _ref3$invalids,
                _ref3$add = _ref3.add,
                add = _ref3$add === undefined ? [] : _ref3$add;

            // Remove invalids
            transform = invalids.reduce(function (t, child) {
                return t.removeNodeByKey(child.key, { normalize: false });
            }, transform);

            // Add valids
            transform = add.reduce(function (t, child) {
                return t.insertNodeByKey(node.key, 0, child);
            }, transform);

            return transform;
        }
    };
}

/**
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A rule that ensures rows contains only cells, and
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

            var valid = rows.every(function (row) {
                return columns === countCells(row);
            });
            if (valid) {
                return null;
            }
            // else normalize, by padding with empty cells
            return rows.map(function (row) {
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
        },


        /**
         * Updates by key every given nodes
         * @param {List<Nodes>} value.toUpdate
         */
        normalize: function normalize(transform, node, rows) {
            return rows.reduce(function (tr, _ref4) {
                var row = _ref4.row,
                    invalids = _ref4.invalids,
                    add = _ref4.add;

                tr = invalids.reduce(function (t, child) {
                    return t.removeNodeByKey(child.key, { normalize: false });
                }, tr);

                tr = Range(0, add).reduce(function (t) {
                    var cell = makeEmptyCell(opts);
                    return t.insertNodeByKey(row.key, 0, cell, { normalize: false });
                }, tr);

                return tr;
            }, transform);
        }
    };
}

/**
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A rule that ensures table node has all align data
 */
function tableContainAlignData(opts) {
    return {
        match: function match(node) {
            return node.type === opts.typeTable;
        },
        validate: function validate(table) {
            var align = table.data.get('align', []);
            var row = table.nodes.first();
            var columns = row.nodes.size;

            return align.length == columns ? null : { align: align, columns: columns };
        },


        /**
         * Updates by key the table to add the data
         * @param {Map} align
         * @param {Number} columns
         */
        normalize: function normalize(transform, node, _ref5) {
            var align = _ref5.align,
                columns = _ref5.columns;

            var data = node.data.set('align', createAlign(columns, align));

            return transform.setNodeByKey(node.key, { data: data }, { normalize: false });
        }
    };
}

/**
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A rule that ensures table node has all widths data
 */
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
         * @param {Map} widths
         * @param {Number} columns
         */
        normalize: function normalize(transform, node, _ref6) {
            var widths = _ref6.widths,
                columns = _ref6.columns;

            var data = node.data.set('widths', createWidths(columns, widths));

            return transform.setNodeByKey(node.key, { data: data }, { normalize: false });
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
        normalize: function normalize(transform, node, invalidIndices) {
            var data = node.data;
            var widths = data.get('widths').slice();
            invalidIndices.forEach(function (index) {
                widths[index] = opts.minWidth;
            });

            data = data.set('widths', widths);

            return transform.setNodeByKey(node.key, { data: data }, { normalize: false });
        }
    };
}

function makeEmptyCell(opts) {
    return Slate.Block.create({
        type: opts.typeCell
    });
}

function makeEmptyRow(opts) {
    return Slate.Block.create({
        type: opts.typeRow,
        nodes: List([makeEmptyCell(opts)])
    });
}

module.exports = makeSchema;