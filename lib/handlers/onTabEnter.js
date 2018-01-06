// @flow
import { type Change } from 'slate';

import { moveSelectionBy } from '../changes';
import type Options from '../options';

const KEY_ENTER = 'Enter';
const KEY_TAB = 'Tab';

/**
 * Select all text of current block.
 */
function selectAllText(change: Change): Change {
    const { value } = change;
    const { startBlock } = value;

    return change.moveOffsetsTo(0).extend(startBlock.text.length);
}

/**
 * Pressing "Tab" or "Enter" moves the cursor to the next cell
 * and select the whole text
 */
function onTabEnter(
    event: *,
    change: Change,
    editor: *,
    opts: Options
): void | Change {
    event.preventDefault();
    let xDirection = 0;
    let yDirection = 0;

    if (event.key === KEY_TAB) {
        xDirection = event.shiftKey ? -1 : +1;
    } else if (event.key === KEY_ENTER) {
        yDirection = event.shiftKey ? -1 : +1;
    }

    // Move
    moveSelectionBy(opts, change, xDirection, yDirection);

    // Select all cell.
    return selectAllText(change);
}

export default onTabEnter;
