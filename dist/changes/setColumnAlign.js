'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _utils = require('../utils');

var _ALIGN = require('../ALIGN');

var _ALIGN2 = _interopRequireDefault(_ALIGN);

var _setTableAlign = require('./setTableAlign');

var _setTableAlign2 = _interopRequireDefault(_setTableAlign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sets column alignment for a given column
 */
function setColumnAlign(opts, change) {
    var cellAlign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _ALIGN2.default.DEFAULT;
    var at = arguments[3];
    var value = change.value;
    var startBlock = value.startBlock;


    var pos = _utils.TablePosition.create(value, startBlock);
    var table = pos.table;

    // Figure out column position

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    var newAlign = (0, _utils.createAlign)(pos.getWidth(), table.data.get('presetAlign'));
    newAlign[at] = cellAlign;
    return (0, _setTableAlign2.default)(opts, change, table, newAlign);
}

exports.default = setColumnAlign;