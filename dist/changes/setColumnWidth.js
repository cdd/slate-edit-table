'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _utils = require('../utils');

var _DIMENSIONS = require('../DIMENSIONS');

var _DIMENSIONS2 = _interopRequireDefault(_DIMENSIONS);

var _setTableWidths = require('./setTableWidths');

var _setTableWidths2 = _interopRequireDefault(_setTableWidths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sets column width for a given column
 */
function setColumnWidth(opts, change) {
    var cellWidths = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _DIMENSIONS2.default.DEFAULT.WIDTH;
    var at = arguments[3];
    var value = change.value;
    var startBlock = value.startBlock;


    var pos = _utils.TablePosition.create(value, startBlock);
    var table = pos.table;

    // Figure out column position

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    var newWidths = (0, _utils.createWidths)(pos.getWidth(), table.data.get('widths'));
    newWidths[at] = cellWidths;
    return (0, _setTableWidths2.default)(opts, change, table, newWidths);
}

exports.default = setColumnWidth;