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
    var data = table.data.set('widths', widths);

    change.setNodeByKey(table.key, { data: data });

    return change;
}
exports.default = setTableWidths;