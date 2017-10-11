const TablePosition = require('../TablePosition');
const DIMENSIONS = require('../DIMENSIONS');
const createWidths = require('../createWidths');

/**
 * Sets column width for a given column
 *
 * @param {Object} opts
 * @param {Slate.Change} change
 * @param {Number} width
 * @param {Number} at
 * @return {Slate.Change}
 */
function setColumnWidth(opts, change, width = DIMENSIONS.DEFAULT.WIDTH, at) {
    const { state } = change;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock);
    const { table } = pos;
    const data = table.data;

    // Figure out column position
    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    width = width > opts.minWidth ? width : opts.minWidth;
    const widths = createWidths(pos.getWidth(), data.get('widths'));
    widths[at] = width;

    change.setNodeByKey(table.key, { data: data.set('widths', widths) });

    return change;
}

module.exports = setColumnWidth;
