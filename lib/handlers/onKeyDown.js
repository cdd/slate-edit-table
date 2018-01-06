// @flow

import { type Change } from 'slate';

import type Options from '../options';
import { isSelectionInTable } from '../utils';

import onTabEnter from './onTabEnter';
import onBackspace from './onBackspace';
import onUpDown from './onUpDown';

const KEY_ENTER = 'Enter';
const KEY_TAB = 'Tab';
const KEY_BACKSPACE = 'Backspace';
const KEY_DOWN = 'ArrowDown';
const KEY_UP = 'ArrowUp';

/**
 * User is pressing a key in the editor
 */
function onKeyDown(
    opts: Options,
    event: *,
    change: Change,
    editor: *
): void | any {
    // Only handle events in cells
    if (!isSelectionInTable(opts, change.value)) {
        return undefined;
    }

    // Build arguments list
    const args = [event, change, editor, opts];

    switch (event.key) {
        case KEY_ENTER:
        case KEY_TAB:
            return onTabEnter(...args);
        case KEY_BACKSPACE:
            return onBackspace(...args);
        case KEY_DOWN:
        case KEY_UP:
            return onUpDown(...args);
        default:
            return undefined;
    }
}

export default onKeyDown;
