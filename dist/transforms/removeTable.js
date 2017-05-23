'use strict';

var TablePosition = require('../TablePosition');

/**
 * Delete the whole table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} at
 * @return {Slate.Transform}
 */
function removeTable(opts, transform, at) {
  var state = transform.state;
  var startBlock = state.startBlock;


  var pos = TablePosition.create(state, startBlock);
  var table = pos.table;


  return transform.deselect().removeNodeByKey(table.key);
}

module.exports = removeTable;