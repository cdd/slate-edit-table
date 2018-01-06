// @flow
import { type Change } from 'slate';

import { createTable } from '../utils';
import type Options from '../options';

/**
 * Insert a new table
 */
function insertTable(
    opts: Options,
    change: Change,
    columns?: number = 2,
    rows?: number = 2,
    cellGetter = (x: number, y: number): text => ''
) {
    const { value } = change;

    if (!value.selection.startKey) return change;

    // Create the table node
    const table = createTable(opts, columns, rows, cellGetter);

    return change.insertBlock(table);
}

export default insertTable;
