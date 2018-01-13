'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


/**
 * Is the selection in a table
 */
function isSelectionInTable(opts, value) {
    var _value$selection = value.selection,
        anchorKey = _value$selection.anchorKey,
        focusKey = _value$selection.focusKey;


    if (!anchorKey || !focusKey) return false;

    var typeTable = opts.typeTable,
        typeRow = opts.typeRow,
        typeCell = opts.typeCell;


    var startCell = value.document.getClosest(anchorKey, function (node) {
        return node.type === typeCell;
    });
    var endCell = value.document.getClosest(focusKey, function (node) {
        return node.type === typeCell;
    });

    // Only handle events in cells
    if (!startCell || !endCell) {
        return false;
    }

    if (anchorKey === focusKey) {
        return true;
    }
    // Not the same cell, look into ancestor chain:

    var startRow = value.document.getClosest(anchorKey, function (node) {
        return node.type === typeRow;
    });
    var endRow = value.document.getClosest(focusKey, function (node) {
        return node.type === typeRow;
    });

    // Check for same table row
    if (startRow === endRow) {
        return true;
    }
    // Different rows

    var startTable = value.document.getClosest(startRow, function (node) {
        return node.type === typeTable;
    });
    var endTable = value.document.getClosest(endRow, function (node) {
        return node.type === typeTable;
    });

    // Check for same table
    return startTable === endTable;
}

exports.default = isSelectionInTable;