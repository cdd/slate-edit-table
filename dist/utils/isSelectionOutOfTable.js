'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


/**
 * Is the selection in a table
 */
function isSelectionOutOfTable(opts, value) {
    if (!value.selection.startKey) return false;

    var startBlock = value.startBlock,
        endBlock = value.endBlock;


    var startCell = value.document.getClosest(startBlock.key, function (node) {
        return node.type === typeCell;
    });
    var endCell = value.document.getClosest(endBlock.key, function (node) {
        return node.type === typeCell;
    });

    // Only handle events in cells
    return !startCell && !endCell;
}

exports.default = isSelectionOutOfTable;