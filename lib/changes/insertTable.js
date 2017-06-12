const createTable = require('../createTable');

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

    if (!state.selection.startKey) return false;

    // Create the table node
    const table = createTable(opts, columns, rows, cellGetter);

    return change
        .insertBlock(table);
}

module.exports = insertTable;
