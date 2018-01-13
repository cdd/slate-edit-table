'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getClosest = function getClosest(parent, childKey, type) {
    return parent.getClosest(childKey, function (node) {
        return node.type === type;
    });
};

/**
 * Is the selection in a table
 */
function isSelectionInTable(opts, value) {
    var document = value.document,
        selection = value.selection;
    var anchorKey = selection.anchorKey,
        focusKey = selection.focusKey;


    if (!anchorKey || !focusKey) return false;

    var typeTable = opts.typeTable,
        typeRow = opts.typeRow,
        typeCell = opts.typeCell;


    var startCell = getClosest(document, anchorKey, typeCell);
    var endCell = getClosest(document, focusKey, typeCell);

    // Only handle events in cells
    if (!startCell || !endCell) {
        return false;
    }

    if (anchorKey === focusKey) {
        return true;
    }
    // Not the same cell, look into ancestor chain:

    var startRow = getClosest(document, anchorKey, typeRow);
    var endRow = getClosest(document, focusKey, typeRow);

    // Check for same table row
    if (startRow === endRow) {
        return true;
    }
    // Different rows

    var startTable = getClosest(document, anchorKey, typeTable);
    var endTable = getClosest(document, focusKey, typeTable);

    // Check for same table
    return startTable === endTable;
}

exports.default = isSelectionInTable;