'use strict';

var moveSelectionBy = require('./transforms/moveSelectionBy');

/**
 * Select all text of current block.
 * @param {Slate.Transform} transform
 * @return {Slate.Transform}
 */
function selectAllText(transform) {
    var state = transform.state;
    var startBlock = state.startBlock;


    return transform.moveOffsetsTo(0).extend(startBlock.length);
}

/**
 * Pressing "Tab" or "Enter" moves the cursor to the next cell
 * and select the whole text
 */
function onTab(event, data, state, opts) {
    event.preventDefault();
    var transform = state.transform();
    var dx = 0;
    var dy = 0;

    if (data.isTab) {
        dx = data.isShift ? -1 : 1;
    } else {
        dy = data.isShift ? -1 : 1;
    }

    // Move
    transform = moveSelectionBy(opts, transform, dx, dy);

    // Select all cell.
    return selectAllText(transform).apply();
}

module.exports = onTab;