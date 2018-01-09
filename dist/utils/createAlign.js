'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _ALIGN = require('../ALIGN');

var _ALIGN2 = _interopRequireDefault(_ALIGN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a set of alignment
 */
function createAlign(columns) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return (0, _immutable.Range)(0, columns).map(function (i) {
    return base[i] || _ALIGN2.default.DEFAULT;
  }).toArray();
}

exports.default = createAlign;