'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _DIMENSIONS = require('../DIMENSIONS');

var _DIMENSIONS2 = _interopRequireDefault(_DIMENSIONS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a set of widths
 * @param  {Number} columns
 * @param  {List} base
 * @return {List} list
 */
function createWidths(columns) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return (0, _immutable.Range)(0, columns).map(function (i) {
    return base[i] || _DIMENSIONS2.default.DEFAULT.WIDTH;
  }).toArray();
}

exports.default = createWidths;