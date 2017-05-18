'use strict';

var TablePosition = require('./TablePosition');
var moveSelectionBy = require('./transforms/moveSelectionBy');
var insertRow = require('./transforms/insertRow');

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
 * Pressing "Tab" moves the cursor to the next cell
 * and select the whole text
 */
function onTab(event, data, state, opts) {
    event.preventDefault();
    var direction = data.isShift ? -1 : +1;
    var transform = state.transform();

    // Create new row if needed
    var startBlock = state.startBlock;

    var pos = TablePosition.create(state, startBlock);
    if (pos.isFirstCell() && direction === -1) {
        transform = insertRow(opts, transform, 0);
    } else if (pos.isLastCell() && direction === 1) {
        transform = insertRow(opts, transform);
    }

    // Move
    transform = moveSelectionBy(opts, transform, direction, 0);

    // Select all cell.
    return selectAllText(transform).apply();
}

module.exports = onTab;