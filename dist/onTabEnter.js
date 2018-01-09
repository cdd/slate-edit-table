'use strict';

var moveSelectionBy = require('./changes/moveSelectionBy');

/**
 * Select all text of current block.
 * @param {Slate.Change} change
 * @return {Slate.Change}
 */
function selectAllText(change) {
    var state = change.state;
    var startBlock = state.startBlock;


    return change.moveOffsetsTo(0).extend(startBlock.text.length);
}

/**
 * Pressing "Tab" or "Enter" moves the cursor to the next cell
 * and select the whole text
 */
function onTabEnter(event, change, editor, opts) {
    event.preventDefault();
    var state = change.state;

    var dx = 0;
    var dy = 0;

    if (event.key === 'Tab') {
        dx = event.shiftKey ? -1 : 1;
    } else {
        dy = event.shiftKey ? -1 : 1;
    }

    // Move
    moveSelectionBy(opts, change, dx, dy);

    // Select all cell.
    return selectAllText(change);
}

module.exports = onTabEnter;