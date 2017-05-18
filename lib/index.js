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
const onEnter     = require('./onEnter');
const onModEnter  = require('./onModEnter');
const onTab       = require('./onTab');
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
 *  Returns the full plugin object (behavior + rendering + schema)
 */
function EditTable(
    // The plugin options
    optionsParam?: OptionsFormat
): Object {
    const opts = new Options(optionsParam || {});
    const corePlugin = core(opts);

    return {
        ...corePlugin,

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
EditTable.ALIGN      = ALIGN;
EditTable.DIMENSIONS = DIMENSIONS;

export default EditTable;
