const { List } = require('immutable');
const TablePosition = require('../TablePosition');
const moveSelection = require('./moveSelection');
const createCell = require('../createCell');
const ALIGN = require('../ALIGN');
const DIMENSIONS = require('../DIMENSIONS');

/**
 * Insert a new column in current table
 *
 * @param {Options} opts The plugin options
 * @param {Slate.Change} change
 * @param {Number} at
 * @param {String} columnAlign
 * @param {String} columnWidth
 * @return {Slate.Change}
 */
function insertColumn(opts, change, at, columnAlign = ALIGN.DEFAULT, columnWidth = DIMENSIONS.DEFAULT.WIDTH) {
    const { state } = change;
    const { startBlock } = state;

    const pos = TablePosition.create(value, startBlock);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex() + 1;
    }

    // Insert the new cell
    table.nodes.forEach(row => {
        let newCell = createCell(opts.typeCell);
        newCell = newCell.setIn(['data', 'textAlign'], ALIGN.DEFAULT);
        change.insertNodeByKey(row.key, at, newCell, { normalize: false });
    });

    // Update alignment
    let align = List(table.data.get('align'));
    align = align.insert(at, columnAlign);

    let widths = List(table.data.get('widths'));
    widths = widths.insert(at, columnWidth);

    change = change.setNodeByKey(table.key, {
        data: {
            align,
            widths
        }
    });

    // Update the selection (not doing can break the undo)
    return moveSelection(opts, change, at, pos.getRowIndex());
}

export default insertColumn;
