'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setColumnWidth = exports.setColumnAlign = exports.moveSelectionBy = exports.moveSelection = exports.removeTable = exports.removeColumn = exports.insertColumn = exports.removeRow = exports.insertRow = exports.insertTable = undefined;

var _insertTable = require('./insertTable');

var _insertTable2 = _interopRequireDefault(_insertTable);

var _insertRow = require('./insertRow');

var _insertRow2 = _interopRequireDefault(_insertRow);

var _removeRow = require('./removeRow');

var _removeRow2 = _interopRequireDefault(_removeRow);

var _insertColumn = require('./insertColumn');

var _insertColumn2 = _interopRequireDefault(_insertColumn);

var _removeColumn = require('./removeColumn');

var _removeColumn2 = _interopRequireDefault(_removeColumn);

var _removeTable = require('./removeTable');

var _removeTable2 = _interopRequireDefault(_removeTable);

var _moveSelection = require('./moveSelection');

var _moveSelection2 = _interopRequireDefault(_moveSelection);

var _moveSelectionBy = require('./moveSelectionBy');

var _moveSelectionBy2 = _interopRequireDefault(_moveSelectionBy);

var _setColumnAlign = require('./setColumnAlign');

var _setColumnAlign2 = _interopRequireDefault(_setColumnAlign);

var _setColumnWidth = require('./setColumnWidth');

var _setColumnWidth2 = _interopRequireDefault(_setColumnWidth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.insertTable = _insertTable2.default;
exports.insertRow = _insertRow2.default;
exports.removeRow = _removeRow2.default;
exports.insertColumn = _insertColumn2.default;
exports.removeColumn = _removeColumn2.default;
exports.removeTable = _removeTable2.default;
exports.moveSelection = _moveSelection2.default;
exports.moveSelectionBy = _moveSelectionBy2.default;
exports.setColumnAlign = _setColumnAlign2.default;
exports.setColumnWidth = _setColumnWidth2.default;