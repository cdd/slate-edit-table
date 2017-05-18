'use strict';

var Slate = require('slate');

function onBackspace(event, data, state, opts) {
    var startBlock = state.startBlock,
        startOffset = state.startOffset,
        isCollapsed = state.isCollapsed,
        endBlock = state.endBlock;

    // If a cursor is collapsed at the start of the block, do nothing

    if (startOffset === 0 && isCollapsed) {
        event.preventDefault();
        return state;
    }

    // If "normal" deletion, we continue
    if (startBlock === endBlock) {
        return;
    }

    // If cursor is between multiple blocks,
    // we clear the content of the cells
    event.preventDefault();

    var blocks = state.blocks,
        focusBlock = state.focusBlock;

    var transform = blocks.reduce(function (tr, block) {
        if (block.type !== opts.typeCell) {
            return transform;
        }

        var cellRange = Slate.Selection.create().moveToRangeOf(block);

        return tr.deleteAtRange(cellRange);
    }, state.transform());

    // Clear selected cells
    return transform.collapseToStartOf(focusBlock).apply();
}

module.exports = onBackspace;