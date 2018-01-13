// @flow

import type { Value } from 'slate';
import type Options from '../options';

/**
 * Is the selection in a table
 */
function isSelectionInTable(opts: Options, value: Value): boolean {
    const { anchorKey, focusKey } = value.selection;

    if (!anchorKey || !focusKey) return false;

    const { typeTable, typeRow, typeCell } = opts;

    const startCell = value.document
        .getClosest(anchorKey, node => node.type === typeCell);
    const endCell = value.document
        .getClosest(focusKey, node => node.type === typeCell);

    // Only handle events in cells
    if (!startCell || !endCell) {
        return false;
    }

    if (anchorKey === focusKey) {
        return true;
    }
    // Not the same cell, look into ancestor chain:

    const startRow = value.document
        .getClosest(anchorKey, node => node.type === typeRow);
    const endRow = value.document
        .getClosest(focusKey, node => node.type === typeRow);

    // Check for same table row
    if (startRow === endRow) {
        return true;
    }
    // Different rows

    const startTable = value.document
        .getClosest(startRow, node => node.type === typeTable);
    const endTable = value.document
        .getClosest(endRow, node => node.type === typeTable);

    // Check for same table
    return startTable === endTable;
}

export default isSelectionInTable;
