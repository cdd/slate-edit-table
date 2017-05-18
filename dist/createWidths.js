'use strict';

var _require = require('immutable'),
    Range = _require.Range;

var DIMENSIONS = require('./DIMENSIONS');

/**
 * Create a set of widths
 * @param  {Number} columns
 * @param  {List} base
 * @return {List} list
 */
function createWidths(columns) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return Range(0, columns).map(function (i) {
    return base[i] || DIMENSIONS.DEFAULT.WIDTH;
  }).toArray();
}

module.exports = createWidths;