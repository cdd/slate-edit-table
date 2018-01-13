'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _utils = require('../utils');

/**
 * Move selection to {x,y}
 */
function moveSelection(opts, change, x, y) {
    var value = change.value;
    var startBlock = value.startBlock;
    var startOffset = value.startOffset;


    var pos = _utils.TablePosition.create(value, startBlock);
    var table = pos.table;


    var row = table.nodes.get(y);
    var cell = row.nodes.get(x);

    // Calculate new offset
    if (startOffset > cell.text.length) {
        startOffset = cell.text.length;
    }

    return change.collapseToEndOf(cell).moveOffsetsTo(startOffset);
}

exports.default = moveSelection;