'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _options = require('./options');

var _options2 = _interopRequireDefault(_options);

var _ALIGN = require('./ALIGN');

var _ALIGN2 = _interopRequireDefault(_ALIGN);

var _DIMENSIONS = require('./DIMENSIONS');

var _DIMENSIONS2 = _interopRequireDefault(_DIMENSIONS);

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _handlers = require('./handlers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Returns the full plugin object (behavior + rendering + schema)
 */
function SimpleTable(
// The plugin options
optionsParam) {
    var opts = new _options2.default(optionsParam || {});
    var corePlugin = (0, _core2.default)(opts);

    return _extends({}, corePlugin, {

        onKeyDown: _handlers.onKeyDown.bind(null, opts)
    });
}

// Expose align constants to the plugin
SimpleTable.ALIGN = _ALIGN2.default;
SimpleTable.DIMENSIONS = _DIMENSIONS2.default;

exports.default = SimpleTable;