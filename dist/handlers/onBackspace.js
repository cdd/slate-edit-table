'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slate = require('slate');

function onBackspace(event, change, editor, opts) {
    var value = change.value;
    var startBlock = value.startBlock,
        startOffset = value.startOffset,
        isCollapsed = value.isCollapsed,
        endBlock = value.endBlock;

    // If a cursor is collapsed at the start of the block, do nothing

    if (startOffset === 0 && isCollapsed) {
        event.preventDefault();
        return change;
    }

    // If "normal" deletion, we continue
    if (startBlock === endBlock) {
        return undefined;
    }

    // If cursor is between multiple blocks,
    // we clear the content of the cells
    event.preventDefault();

    var blocks = value.blocks,
        focusBlock = value.focusBlock;

    blocks.forEach(function (block) {
        if (block.type !== opts.typeCell) {
            return change;
        }

        var cellRange = _slate.Range.create().moveToRangeOf(block);

        return change.deleteAtRange(cellRange);
    });

    // Clear selected cells
    return change.collapseToStartOf(focusBlock);
}
exports.default = onBackspace;