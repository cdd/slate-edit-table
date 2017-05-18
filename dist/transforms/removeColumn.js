'use strict';

var _require = require('immutable'),
    List = _require.List;

var TablePosition = require('../TablePosition');

/**
 * Delete current column in a table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} at
 * @return {Slate.Transform}
 */
function removeColumn(opts, transform, at) {
    var _transform = transform,
        state = _transform.state;
    var startBlock = state.startBlock;


    var pos = TablePosition.create(state, startBlock);
    var table = pos.table;


    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    var rows = table.nodes;

    // Remove the cell from every row
    if (pos.getWidth() > 1) {
        rows.forEach(function (row) {
            var cell = row.nodes.get(at);
            transform.removeNodeByKey(cell.key);
        });

        // Update alignment
        var align = List(table.data.get('align'));
        align = align.delete(at);
        transform = transform.setNodeByKey(table.key, {
            data: { align: align }
        });
    }
    // If last column, clear text in cells instead
    else {
            rows.forEach(function (row) {
                row.nodes.forEach(function (cell) {
                    cell.nodes.forEach(function (node) {
                        // We clear the texts in the cells
                        transform.removeNodeByKey(node.key);
                    });
                });
            });
        }

    // Replace the table
    return transform;
}

module.exports = removeColumn;