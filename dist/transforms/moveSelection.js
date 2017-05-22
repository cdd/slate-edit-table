'use strict';

var TablePosition = require('../TablePosition');

/**
 * Move selection to {x,y}
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} x
 * @param {Number} y
 * @return {Slate.Transform}
 */
function moveSelection(opts, transform, x, y) {
    var state = transform.state;
    var startBlock = state.startBlock,
        startOffset = state.startOffset;


    if (startBlock.type !== opts.typeCell) {
        throw new Error('moveSelection can only be applied from within a cell');
    }

    var pos = TablePosition.create(state, startBlock);
    var table = pos.table;


    var row = table.nodes.get(y);
    var cell = row.nodes.get(x);

    // Calculate new offset
    if (startOffset > cell.length) {
        startOffset = cell.length;
    }

    return transform.collapseToEndOf(cell).moveOffsetsTo(startOffset);
}

module.exports = moveSelection;