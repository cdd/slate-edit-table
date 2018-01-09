'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


/**
 * Is the selection in a table
 */
function isSelectionInTable(opts, value) {
    if (!value.selection.startKey) return false;

    var startBlock = value.startBlock,
        endBlock = value.endBlock;

    // Only handle events in cells

    if (startBlock.type !== opts.typeCell || endBlock.type !== opts.typeCell) {
        return false;
    }

    if (startBlock === endBlock) {
        return startBlock.type === opts.typeCell;
    }
    // Not the same cell, look into ancestor chain:

    var startAncestors = value.document.getAncestors(startBlock.key).slice(-2);
    var endAncestors = value.document.getAncestors(endBlock.key).slice(-2);

    // Check for same table row
    var startRow = startAncestors.last();
    var endRow = endAncestors.last();
    if (startRow === endRow) {
        return true;
    }
    // Different rows

    // Check for same table
    var startTable = startAncestors.first();
    var endTable = endAncestors.first();
    return startTable === endTable;
}

exports.default = isSelectionInTable;