const moveSelectionBy = require('./changes/moveSelectionBy');

/**
 * Select all text of current block.
 * @param {Slate.Change} change
 * @return {Slate.Change}
 */
function selectAllText(change) {
    const { state } = change;
    const { startBlock } = state;

    return change
        .moveOffsetsTo(0)
        .extend(startBlock.text.length);
}

/**
 * Pressing "Tab" or "Enter" moves the cursor to the next cell
 * and select the whole text
 */
function onTabEnter(event, change, editor, opts) {
    event.preventDefault();
    const { state } = change;
    let dx = 0;
    let dy = 0;

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
