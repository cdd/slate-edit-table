'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var _slate = require('slate');

var _createRow = require('./createRow');

var _createRow2 = _interopRequireDefault(_createRow);

var _createAlign = require('./createAlign');

var _createAlign2 = _interopRequireDefault(_createAlign);

var _createWidths = require('./createWidths');

var _createWidths2 = _interopRequireDefault(_createWidths);

var _getAdjustedRow = require('../helpers/getAdjustedRow');

var _getAdjustedRow2 = _interopRequireDefault(_getAdjustedRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a table
 */
function createTable(opts, columns, rows, textGetter, widths) {
    var presetAlign = (0, _createAlign2.default)(columns);
    widths = widths || (0, _createWidths2.default)(columns);
    var rowNodes = (0, _immutable.Range)(0, rows).map(function (i) {
        return (0, _createRow2.default)(opts, columns, textGetter ? textGetter.bind(null, i) : undefined);
    }).toList().map(function (row) {
        return (0, _getAdjustedRow2.default)(row, presetAlign);
    });

    return _slate.Block.create({
        type: opts.typeTable,
        nodes: rowNodes,
        data: {
            presetAlign: presetAlign,
            widths: widths
        }
    });
}

exports.default = createTable;