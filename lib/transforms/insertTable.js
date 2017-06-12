const createTable = require('../createTable');

const fillWithEmptyText = (x, y) => '';

/**
 * Insert a new table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} columns
 * @param {Number} rows
 * @param {Function} cellGetter
 * @return {Slate.Transform}
 */
function insertTable(opts, transform, columns = 2, rows = 2, cellGetter = fillWithEmptyText) {
    const { state } = transform;

    if (!state.selection.startKey) return false;

    // Create the table node
    const table = createTable(opts, columns, rows, cellGetter);

    return transform
        .insertBlock(table);
}

module.exports = insertTable;
