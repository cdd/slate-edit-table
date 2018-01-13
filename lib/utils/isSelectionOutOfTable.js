// @flow

import type { Value } from 'slate';
import type Options from '../options';

/**
 * Is the selection in a table
 */
function isSelectionOutOfTable(opts: Options, value: Value): boolean {
    if (!value.selection.startKey) return false;

    const { startBlock, endBlock } = value;

    const startCell = value.document
        .getClosest(startBlock.key, node => node.type === typeCell);
    const endCell = value.document
        .getClosest(endBlock.key, node => node.type === typeCell);

    // Only handle events in cells
    return !startCell && !endCell
}

export default isSelectionOutOfTable;
