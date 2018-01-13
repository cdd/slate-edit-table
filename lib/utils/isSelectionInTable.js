// @flow

import type { Value } from 'slate';
import type Options from '../options';

const getClosest = (parent, childKey, type) =>
    parent.getClosest(childKey, node => node.type === type);

/**
 * Is the selection in a table
 */
function isSelectionInTable(opts: Options, value: Value): boolean {
    const { document, selection } = value;
    const { anchorKey, focusKey } = selection;

    if (!anchorKey || !focusKey) return false;

    const { typeTable, typeRow, typeCell } = opts;

    const startCell = getClosest(document, anchorKey, typeCell);
    const endCell = getClosest(document, focusKey, typeCell);

    // Only handle events in cells
    if (!startCell || !endCell) {
        return false;
    }

    if (anchorKey === focusKey) {
        return true;
    }
    // Not the same cell, look into ancestor chain:

    const startRow = getClosest(document, anchorKey, typeRow);
    const endRow = getClosest(document, focusKey, typeRow);

    // Check for same table row
    if (startRow === endRow) {
        return true;
    }
    // Different rows

    const startTable = getClosest(document, anchorKey, typeTable);
    const endTable = getClosest(document, focusKey, typeTable);

    // Check for same table
    return startTable === endTable;
}

export default isSelectionInTable;
