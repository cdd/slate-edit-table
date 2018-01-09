'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _utils = require('../utils');

/**
 * Remove current row in a table. Clear it if last remaining row
 */
function removeRow(opts, change, at) {
    var value = change.value;
    var startBlock = value.startBlock;


    var pos = _utils.TablePosition.create(value, startBlock);
    var table = pos.table;


    if (typeof at === 'undefined') {
        at = pos.getRowIndex();
    }

    var row = table.nodes.get(at);
    // Update table by removing the row
    if (pos.getHeight() > 1) {
        change.removeNodeByKey(row.key);
    } else {
        // If last remaining row, clear it instead
        row.nodes.forEach(function (cell) {
            cell.nodes.forEach(function (node) {
                change.removeNodeByKey(node.key);
            });
        });
    }

    return change;
}

exports.default = removeRow;