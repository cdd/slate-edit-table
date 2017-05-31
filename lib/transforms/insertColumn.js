const { List } = require('immutable');
const TablePosition = require('../TablePosition');
const moveSelection = require('./moveSelection');
const createCell = require('../createCell');
const ALIGN = require('../ALIGN');
const DIMENSIONS = require('../DIMENSIONS');

/**
 * Insert a new column in current table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} at
 * @param {String} columnAlign
 * @param {String} columnWidth
 * @return {Slate.Transform}
 */
function insertColumn(opts, transform, at, columnAlign = ALIGN.DEFAULT, columnWidth = DIMENSIONS.DEFAULT.WIDTH) {
    const { state } = transform;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex() + 1;
    }

    // Insert the new cell
    table.nodes.forEach((row) => {
        const newCell = createCell(opts.typeCell);
        transform = transform.insertNodeByKey(row.key, at, newCell);
    });

    // Update alignment
    let align = List(table.data.get('align'));
    align = align.insert(at, columnAlign);
    let widths = List(table.data.get('widths'));
    widths = widths.insert(at, columnWidth);
    transform = transform.setNodeByKey(table.key, {
        data: {
            align,
            widths
        }
    });

    // Update the selection (not doing can break the undo)
    return moveSelection(opts, transform, at, pos.getRowIndex());
}

module.exports = insertColumn;
