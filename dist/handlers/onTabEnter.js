'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _changes = require('../changes');

var KEY_ENTER = 'Enter';
var KEY_TAB = 'Tab';

/**
 * Select all text of current block.
 */
function selectAllText(change) {
    var value = change.value;
    var startBlock = value.startBlock;


    return change.moveOffsetsTo(0).extend(startBlock.text.length);
}

/**
 * Pressing "Tab" or "Enter" moves the cursor to the next cell
 * and select the whole text
 */
function onTabEnter(event, change, editor, opts) {
    event.preventDefault();
    var xDirection = 0;
    var yDirection = 0;

    if (event.key === KEY_TAB) {
        xDirection = event.shiftKey ? -1 : +1;
    } else if (event.key === KEY_ENTER) {
        yDirection = event.shiftKey ? -1 : +1;
    }

    // Move
    (0, _changes.moveSelectionBy)(opts, change, xDirection, yDirection);

    // Select all cell.
    return selectAllText(change);
}

exports.default = onTabEnter;