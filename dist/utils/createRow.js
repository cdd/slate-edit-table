'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var _slate = require('slate');

var _createCell = require('./createCell');

var _createCell2 = _interopRequireDefault(_createCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a new row block
 */
function createRow(opts, columns, textGetter) {
    var cellNodes = (0, _immutable.Range)(0, columns).map(function (i) {
        return (0, _createCell2.default)(opts.typeCell, textGetter ? textGetter(i) : '');
    }).toList();

    return _slate.Block.create({
        type: opts.typeRow,
        nodes: cellNodes
    });
}
exports.default = createRow;