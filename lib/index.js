const insertTable     = require('./changes/insertTable');
const insertRow       = require('./changes/insertRow');
const removeRow       = require('./changes/removeRow');
const insertColumn    = require('./changes/insertColumn');
const removeColumn    = require('./changes/removeColumn');
const removeTable     = require('./changes/removeTable');
const moveSelection   = require('./changes/moveSelection');
const moveSelectionBy = require('./changes/moveSelectionBy');
const setColumnAlign  = require('./changes/setColumnAlign');
const setColumnWidth  = require('./changes/setColumnWidth');

const Options     = require('./options');
const onTabEnter  = require('./onTabEnter');
const onBackspace = require('./onBackspace');
const onUpDown    = require('./onUpDown');
const ALIGN       = require('./ALIGN');
const DIMENSIONS  = require('./DIMENSIONS');
const makeSchema  = require('./makeSchema');
const TablePosition = require('./TablePosition');

const KEY_ENTER     = 'enter';
const KEY_TAB       = 'tab';
const KEY_BACKSPACE = 'backspace';
const KEY_DOWN      = 'down';
const KEY_UP        = 'up';

/**
 * @param {Options} opts The plugin options
 */
function SimpleTable(opts) {
    opts = new Options(opts);

    /**
     * Is the selection in a table
     */
    function isSelectionInTable(state) {
        if (!state.selection.startKey) return false;

        const { startBlock } = state;

        // Only handle events in cells
        return (startBlock.type === opts.typeCell)
            || (state.document.getClosest(state.startKey, b => b.type === opts.typeCell))
    }

    /**
     * @param {State} state The current state
     * @returns {TablePosition} The position of the selection start, in the current table
     * @throws {Error} If the start of the selection is not in a table
     */
    function getPosition(state) {
        if (!isSelectionInTable(state)) {
            throw new Error('Not in a table');
        }
        const cell = state.startBlock;
        return TablePosition.create(state, cell);
    }

    /**
     * Bind a change
     */
    function bindChange(fn) {
        return function(change, ...args) {
            const { state } = change;

            if (!isSelectionInTable(state)) {
                return change;
            }

            return fn(...[opts, change].concat(args));
        };
    }

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(e, data, change) {
        // Only handle events in cells
        if (!isSelectionInTable(change.state)) {
            return;
        }

        // Build arguments list
        const args = [
            e, data, change,
            opts
        ];

        switch (data.key) {
        case KEY_ENTER:
        case KEY_TAB:
            return onTabEnter(...args);
        case KEY_BACKSPACE:
            return onBackspace(...args);
        case KEY_DOWN:
        case KEY_UP:
            return onUpDown(...args);
        }
    }

    const schema = makeSchema(opts);

    return {
        onKeyDown,

        schema,

        utils: {
            isSelectionInTable,
            getPosition
        },

        changes: {
            insertTable:     insertTable.bind(null, opts),
            insertRow:       bindChange(insertRow),
            removeRow:       bindChange(removeRow),
            insertColumn:    bindChange(insertColumn),
            removeColumn:    bindChange(removeColumn),
            removeTable:     bindChange(removeTable),
            moveSelection:   bindChange(moveSelection),
            moveSelectionBy: bindChange(moveSelectionBy),
            setColumnAlign:  bindChange(setColumnAlign),
            setColumnWidth:  bindChange(setColumnWidth),
        }
    };
}

// Expose align constants to the plugin
SimpleTable.ALIGN      = ALIGN;
SimpleTable.DIMENSIONS = DIMENSIONS;

SimpleTable.TablePosition = TablePosition;

module.exports = SimpleTable;
