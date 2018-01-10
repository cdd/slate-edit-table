'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _utils = require('../utils');

var _getAdjustedRow = require('../helpers/getAdjustedRow');

var _getAdjustedRow2 = _interopRequireDefault(_getAdjustedRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Insert a new row in current table
 */
function insertRow(opts, change, at, // row index
textGetter) {
    var value = change.value;
    var startBlock = value.startBlock;


    var pos = _utils.TablePosition.create(value, startBlock);
    var table = pos.table;

    // Create a new row with the right count of cells

    var firstRow = table.nodes.get(0);
    var presetAlign = table.data.get('presetAlign');
    var newRow = (0, _utils.createRow)(opts, firstRow.nodes.size, textGetter);
    newRow = (0, _getAdjustedRow2.default)(newRow, presetAlign);

    if (typeof at === 'undefined') {
        at = pos.getRowIndex() + 1;
    }

    return change.insertNodeByKey(table.key, at, newRow).collapseToEndOf(newRow.nodes.get(pos.getColumnIndex()));
}
exports.default = insertRow;