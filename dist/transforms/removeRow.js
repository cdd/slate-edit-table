'use strict';

var TablePosition = require('../TablePosition');

/**
 * Remove current row in a table. Clear it if last remaining row
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} at
 * @return {Slate.Transform}
 */
function removeRow(opts, transform, at) {
    var state = transform.state;
    var startBlock = state.startBlock;


    var pos = TablePosition.create(state, startBlock);
    var table = pos.table;


    if (typeof at === 'undefined') {
        at = pos.getRowIndex();
    }

    var row = table.nodes.get(at);
    // Update table by removing the row
    if (pos.getHeight() > 1) {
        transform.removeNodeByKey(row.key);
    }
    // If last remaining row, clear it instead
    else {
            row.nodes.forEach(function (cell) {
                cell.nodes.forEach(function (node) {
                    transform.removeNodeByKey(node.key);
                });
            });
        }

    return transform;
}

module.exports = removeRow;