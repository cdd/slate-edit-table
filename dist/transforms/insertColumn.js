'use strict';

var _require = require('immutable'),
    List = _require.List;

var TablePosition = require('../TablePosition');
var moveSelection = require('./moveSelection');
var createCell = require('../createCell');
var ALIGN = require('../ALIGN');

/**
 * Insert a new column in current table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} at
 * @param {String} columnAlign
 * @return {Slate.Transform}
 */
function insertColumn(opts, transform, at) {
    var columnAlign = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ALIGN.DEFAULT;
    var _transform = transform,
        state = _transform.state;
    var startBlock = state.startBlock;


    var pos = TablePosition.create(state, startBlock);
    var table = pos.table;


    if (typeof at === 'undefined') {
        at = pos.getColumnIndex() + 1;
    }

    // Insert the new cell
    table.nodes.forEach(function (row) {
        var newCell = createCell(opts.typeCell);
        transform = transform.insertNodeByKey(row.key, at, newCell);
    });

    // Update alignment
    var align = List(table.data.get('align'));
    align = align.insert(at, columnAlign);
    transform = transform.setNodeByKey(table.key, {
        data: { align: align }
    });

    // Update the selection (not doing can break the undo)
    return moveSelection(opts, transform, pos.getColumnIndex() + 1, pos.getRowIndex());
}

module.exports = insertColumn;