'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _getAdjustedRow = require('../helpers/getAdjustedRow');

var _getAdjustedRow2 = _interopRequireDefault(_getAdjustedRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sets column width for a given column
 */
function setTableWidths(opts, change, table, widths) {
    var nextTable = table.set('nodes', table.nodes.map(function (row) {
        return (0, _getAdjustedRow2.default)(row, widths);
    })).setIn(['data', 'widths'], widths);

    // To restore selection, the following code function like change.replaceNodeByKey(table.key, nextTable).focus();
    change.setNodeByKey(table.key, { data: nextTable.data });
    table.nodes.forEach(function (row, rowIndex) {
        row.nodes.forEach(function (cell, cellIndex) {
            var nextCell = nextTable.nodes.get(rowIndex).nodes.get(cellIndex);
            if (nextCell === cell) {
                return cellIndex;
            }
            change.setNodeByKey(cell.key, { data: nextCell.data });
            return cellIndex;
        });
        return rowIndex;
    });

    return change;
}
exports.default = setTableWidths;