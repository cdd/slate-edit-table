'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _utils = require('../utils');

var _onTabEnter = require('./onTabEnter');

var _onTabEnter2 = _interopRequireDefault(_onTabEnter);

var _onBackspace = require('./onBackspace');

var _onBackspace2 = _interopRequireDefault(_onBackspace);

var _onUpDown = require('./onUpDown');

var _onUpDown2 = _interopRequireDefault(_onUpDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY_ENTER = 'Enter';

var KEY_TAB = 'Tab';
var KEY_BACKSPACE = 'Backspace';
var KEY_DOWN = 'ArrowDown';
var KEY_UP = 'ArrowUp';

/**
 * User is pressing a key in the editor
 */
function onKeyDown(opts, event, change, editor) {
    // Only handle events in cells
    if (!(0, _utils.isSelectionInTable)(opts, change.value)) {
        return undefined;
    }

    // Build arguments list
    var args = [event, change, editor, opts];

    switch (event.key) {
        case KEY_ENTER:
        case KEY_TAB:
            return _onTabEnter2.default.apply(undefined, args);
        case KEY_BACKSPACE:
            return _onBackspace2.default.apply(undefined, args);
        case KEY_DOWN:
        case KEY_UP:
            return _onUpDown2.default.apply(undefined, args);
        default:
            return undefined;
    }
}

exports.default = onKeyDown;