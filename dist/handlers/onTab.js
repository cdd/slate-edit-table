'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _utils = require('../utils');

var _changes = require('../changes');

/**
 * Select all text of current block.
 */
function selectAllText(change) {
    var value = change.value;
    var startBlock = value.startBlock;


    return change.moveOffsetsTo(0).extend(startBlock.text.length);
}

/**
 * Pressing "Tab" moves the cursor to the next cell
 * and select the whole text
 */

function onTab(event, change, editor, opts) {
    event.preventDefault();
    var value = change.value;

    var direction = event.shiftKey ? -1 : +1;

    // Create new row if needed
    var startBlock = value.startBlock,
        selection = value.selection;

    var pos = _utils.TablePosition.create(value, startBlock);
    if (pos.isFirstCell() && direction === -1) {
        (0, _changes.insertRow)(opts, change, 0);
    } else if (pos.isLastCell() && direction === 1) {
        (0, _changes.insertRow)(opts, change);
    }

    // Move back to initial cell (insertRow moves selection automatically).
    change.select(selection);

    // Move
    (0, _changes.moveSelectionBy)(opts, change, direction, 0);

    // Select all cell.
    return selectAllText(change);
}

exports.default = onTab;