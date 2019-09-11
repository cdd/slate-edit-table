// @flow
import { Block, Text, type Change, type Node } from 'slate';
import { Range, List } from 'immutable';

import { createAlign, createWidths } from '../utils';
import type Options from '../options';

type Normalizer = Change => any;
type Validator = Node => void | Normalizer;

// Old format for Slate rules
type Rule = {
    match: Node => boolean,
    validate: Node => any,
    normalize: (Change, Node, any) => Normalizer
};

/**
 * Returns a validateNode function, handling validation specific to tables that
 * cannot be expressed using the schema.
 */
function validateNode(opts: Options): Validator {
    const rules = [
        noCellsWithinCell(opts),
        cellsWithinTable(opts),
        rowsWithinTable(opts),
        tablesContainOnlyRows(opts),
        rowsContainRequiredColumns(opts),
      //tableContainAlignData(opts),
        tableContainWidthsData(opts),
        tableDataHasValidWidths(opts)
    ];
    const validators = rules.map(toValidateNode);

    return function validateTableNode(node) {
        let changer;
        validators.find(validator => {
            changer = validator(node);
            return Boolean(changer);
        });

        return changer;
    };
}

// Convert an old rule definition to an individual plugin with on "validateNode"
function toValidateNode(rule: Rule): Validator {
    return function validateRule(node: Node) {
        if (!rule.match(node)) {
            return undefined;
        }
        const validationResult = rule.validate(node);
        if (validationResult == null) {
            return undefined;
        }

        return change => rule.normalize(change, node, validationResult);
    };
}

/**
 * Rule to enforce cells only contain inlines or text.
 * It unwrap blocks in cell blocks
 */
function noCellsWithinCell(opts: Options): Rule {
    return {
        match(node) {
            return node.object == 'block' && node.type == opts.typeCell;
        },

        // Find nested blocks
        validate(node) {
            const nestedBlocks = node.nodes.filter(
                child => child.object === 'block' && child.type == opts.typeCell
            );

            return nestedBlocks.size > 0 ? nestedBlocks : null;
        },

        // If any, unwrap all nested blocks
        normalize(change, node, nestedBlocks: Node[]) {
            nestedBlocks.forEach(block =>
                block.nodes.forEach(grandChild => {
                    change.unwrapNodeByKey(grandChild.key, {
                        normalize: false
                    });
                })
            );

            return change;
        }
    };
}

/**
 * Rule to enforce cells are always surrounded by a row.
 */
function cellsWithinTable(opts: Options): Rule {
    return {
        match(node) {
            return (
                (node.object === 'document' || node.object === 'block') &&
                node.type !== opts.typeRow
            );
        },

        // Find child cells nodes not in a row
        validate(node) {
            const cells = node.nodes.filter(n => n.type === opts.typeCell);

            if (cells.isEmpty()) {
                return undefined;
            }

            return {
                cells
            };
        },

        // If any, wrap all cells in a row block
        normalize(change, node, { cells }: { cells: Node[] }) {
            cells.forEach(cell =>
                change.wrapBlockByKey(cell.key, opts.typeRow, {
                    normalize: false
                })
            );

            return change;
        }
    };
}

/**
 * Rule to enforce rows are always surrounded by a table.
 */
function rowsWithinTable(opts: Options): Rule {
    return {
        match(node) {
            return (
                (node.object === 'document' || node.object === 'block') &&
                node.type !== opts.typeTable
            );
        },

        // Find child cells nodes not in a row
        validate(node) {
            const rows = node.nodes.filter(n => n.type === opts.typeRow);

            if (rows.isEmpty()) {
                return undefined;
            }

            return {
                rows
            };
        },

        // If any, wrap all cells in a row block
        normalize(change, node, { rows }: { rows: Node[] }) {
            rows.forEach(row =>
                change.wrapBlockByKey(
                    row.key,
                    {
                        type: opts.typeTable,
                        data: {
                            presetAlign: createAlign(row.nodes.size),
                            widths: createWidths(row.nodes.size)
                        }
                    },
                    { normalize: false }
                )
            );

            return change;
        }
    };
}

/**
 * Rule that ensures tables only contain rows and at least one.
 */
function tablesContainOnlyRows(opts: Options): Rule {
    const isRow = node => node.type === opts.typeRow;

    return {
        match(node) {
            return node.type === opts.typeTable;
        },

        validate(table) {
            // Figure out invalid rows
            const invalids = table.nodes.filterNot(isRow);

            if (invalids.isEmpty()) {
                return null;
            }

            return {
                invalids,
            };
        },

        /**
         * Replaces the node's children
         */
        normalize(
            change,
            node,
            { invalids = [] }: { invalids: Node[] }
        ) {
            // Remove invalids
            invalids.forEach(child => {
                change.wrapBlockByKey(child.key, opts.typeCell, { normalize: false })
                const cell = change.value.document.getParent(child.key)
                change.wrapBlockByKey(cell.key, opts.typeRow)
            });

            return change;
        }
    };
}

/**
 * A rule that ensures rows contains only cells, and
 * as much cells as there is columns in the table.
 */
function rowsContainRequiredColumns(opts: Options): Rule {
    const isRow = node => node.type === opts.typeRow;
    const isCell = node => node.type === opts.typeCell;
    const countCells = row => row.nodes.count(isCell);

    return {
        match(node) {
            return node.type === opts.typeTable;
        },

        validate(table) {
            const rows = table.nodes.filter(isRow);

            // The number of column this table has
            const columns = rows.reduce(
                (count, row) => Math.max(count, countCells(row)),
                1
            ); // Min 1 column

            // else normalize, by padding with empty cells
            const invalidRows = rows
                .map(row => {
                    const cells = countCells(row);
                    const invalids = row.nodes.filterNot(isCell);

                    // Row is valid: right count of cells and no extra node
                    if (invalids.isEmpty() && cells === columns) {
                        return null;
                    }

                    // Otherwise, remove the invalids and append the missing cells
                    return {
                        row,
                        invalids,
                        add: columns - cells
                    };
                })
                .filter(Boolean);

            return invalidRows.size > 0 ? invalidRows : null;
        },

        /**
         * Updates by key every given nodes
         */
        normalize(change, node, rows: Node[]) {
            rows.forEach(({ row, invalids, add }) => {
                invalids.forEach(child => {
                    change.removeNodeByKey(child.key, { normalize: false });
                });

                Range(0, add).forEach(() => {
                    const cell = makeEmptyCell(opts);
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
function tableContainAlignData(opts: Options): Rule {
    return {
        match(node) {
            return node.type === opts.typeTable;
        },

        validate(table) {
            const presetAlign = table.data.get('presetAlign', []);
            const row = table.nodes.first();
            const columns = row.nodes.size;

            return presetAlign.length == columns
                ? null
                : { presetAlign, columns };
        },

        /**
         * Updates by key the table to add the data
         */
        normalize(
            change,
            node,
            { presetAlign, columns }: { presetAlign: string[], columns: number }
        ) {
            return change.setNodeByKey(
                node.key,
                {
                    data: node.data.set(
                        'presetAlign',
                        createAlign(columns, presetAlign)
                    )
                },
                { normalize: false }
            );
        }
    };
}

function tableContainWidthsData(opts: Options): Rule {
    return {
        match(node) {
            return node.type === opts.typeTable;
        },

        validate(table) {
            const widths = table.data.get('widths', []);
            const columns = table.nodes.first().nodes.size;

            return widths.length == columns ? null : { widths, columns };
        },

        /**
         * Updates by key the table to add the data
         */
        normalize(
            change,
            node,
            { widths, columns }: { widths: number[], columns: number }
        ) {
            const data = node.data.set('widths', createWidths(columns, widths));

            return change.setNodeByKey(
                node.key,
                { data },
                { normalize: false }
            );
        }
    };
}

function tableDataHasValidWidths(opts: Options): Rule {
    return {
        match(node) {
            return node.type === opts.typeTable;
        },
        validate(table) {
            if (typeof opts.minWidth === 'undefined') {
                return null;
            }

            const widths = table.data.get('widths');
            const invalidIndices = widths.reduce((memo, width, index) => {
                if (width < opts.minWidth) {
                    memo.push(index);
                }

                return memo;
            }, []);

            return invalidIndices.length ? invalidIndices : null;
        },
        normalize(change, node, invalidIndices) {
            let data = node.data;
            const widths = data.get('widths').slice();

            invalidIndices.forEach(index => {
                widths[index] = opts.minWidth;
            });

            data = data.set('widths', widths);

            return change.setNodeByKey(
                node.key,
                { data },
                { normalize: false }
            );
        }
    };
}

function makeEmptyCell(opts: Options): Block {
    return Block.create({
        type: opts.typeCell,
        nodes: List([Text.create('')])
    });
}

function makeEmptyRow(opts: Options): Block {
    return Block.create({
        type: opts.typeRow,
        nodes: List([makeEmptyCell(opts)])
    });
}

export default validateNode;
