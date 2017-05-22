'use strict';

var TablePosition = require('../TablePosition');
var DIMENSIONS = require('../DIMENSIONS');
var createWidths = require('../createWidths');

/**
 * Sets column width for a given column
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} width
 * @param {Number} at
 * @return {Slate.Transform}
 */
function setColumnWidth(opts, transform) {
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DIMENSIONS.DEFAULT.WIDTH;
    var at = arguments[3];
    var state = transform.state;
    var startBlock = state.startBlock;


    var pos = TablePosition.create(state, startBlock);
    var table = pos.table;

    var data = table.data;

    // Figure out column position
    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    width = width > opts.minWidth ? width : opts.minWidth;
    var widths = createWidths(pos.getWidth(), data.get('widths'));
    widths[at] = width;

    transform.setNodeByKey(table.key, { data: data.set('widths', widths) });

    return transform;
}

module.exports = setColumnWidth;