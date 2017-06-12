// @flow
import { type Change } from 'slate';

import { createTable } from '../utils';
import type Options from '../options';

const fillWithEmptyText = (x, y) => '';

/**
 * Insert a new table
 *
 * @param {Options} opts The plugin options
 * @param {Slate.Change} change
 * @param {Number} columns
 * @param {Number} rows
 * @param {Function} cellGetter
 * @return {Slate.Change}
 */
function insertTable(opts, change, columns = 2, rows = 2, cellGetter = fillWithEmptyText) {
    const { state } = change;

    if (!value.selection.startKey) return change;

    // Create the table node
    const table = createTable(opts, columns, rows, cellGetter);

    return change.insertBlock(table);
}

export default insertTable;
