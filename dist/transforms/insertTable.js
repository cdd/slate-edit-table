'use strict';

var createTable = require('../createTable');

/**
 * Insert a new table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} columns
 * @param {Number} rows
 * @return {Slate.Transform}
 */
function insertTable(opts, transform) {
  var columns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  var rows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
  var state = transform.state;


  if (!state.selection.startKey) return false;

  // Create the table node
  var fillWithEmptyText = function fillWithEmptyText(x, y) {
    return '';
  };
  var table = createTable(opts, columns, rows, fillWithEmptyText);

  return transform.insertBlock(table);
}

module.exports = insertTable;