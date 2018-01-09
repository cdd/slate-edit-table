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

    // Only handle events in cells

    return startBlock.type !== opts.typeCell && endBlock.type !== opts.typeCell;
}

exports.default = isSelectionOutOfTable;