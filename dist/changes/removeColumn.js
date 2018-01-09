'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _immutable = require('immutable');

var _utils = require('../utils');

/**
 * Delete current column in a table
 */
function removeColumn(opts, change, at) {
    var value = change.value;
    var startBlock = value.startBlock;


    var pos = _utils.TablePosition.create(value, startBlock);
    var table = pos.table;


    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    var rows = table.nodes;

    // Remove the cell from every row
    if (pos.getWidth() > 1) {
        rows.forEach(function (row) {
            var cell = row.nodes.get(at);
            change.removeNodeByKey(cell.key, { normalize: false });
        });

        // Update alignment
        var presetAlign = table.data.get('presetAlign');
        presetAlign = (0, _immutable.List)(presetAlign).delete(at).toArray();
        var widths = table.data.get('widths');
        widths = (0, _immutable.List)(widths).delete(at).toArray();
        change.setNodeByKey(table.key, {
            data: table.data.set('presetAlign', presetAlign).set('widths', widths)
        });
    } else {
        // If last column, clear text in cells instead
        rows.forEach(function (row) {
            row.nodes.forEach(function (cell) {
                cell.nodes.forEach(function (node) {
                    // We clear the texts in the cells
                    change.removeNodeByKey(node.key);
                });
            });
        });
    }

    // Replace the table
    return change;
}
exports.default = removeColumn;