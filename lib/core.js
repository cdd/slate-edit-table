// @flow
import {
    insertTable,
    insertRow,
    removeRow,
    insertColumn,
    removeColumn,
    removeTable,
    moveSelection,
    moveSelectionBy,
    setColumnAlign,
    setColumnWidth
} from './changes';
import {
    createTable,
    isSelectionInTable,
    isSelectionOutOfTable,
    getPosition
} from './utils';
import { schema, validateNode } from './validation';

import ALIGN from './ALIGN';
import DIMENSIONS from './DIMENSIONS';
import Options, { type OptionsFormat } from './options';

/**
 * Returns the core of the plugin, limited to the validation and normalization
 * part of `slate-simple-table`, and utils.
 *
 * Import this directly: `import SimpleTable from 'slate-edit-table/lib/core'`
 * if you don't care about behavior/rendering and you
 * are only manipulating `Slate.Values` without rendering them.
 * That way you do not depend on `slate-react`.
 */
function core(optionsParam: Options | OptionsFormat): Object {
    const opts = new Options(optionsParam);

    return {
        schema: schema(opts),
        validateNode: validateNode(opts),

        utils: {
            createTable: createTable.bind(null, opts),
            isSelectionInTable: isSelectionInTable.bind(null, opts),
            isSelectionOutOfTable: isSelectionOutOfTable.bind(null, opts),
            getPosition: getPosition.bind(null, opts)
        },

        changes: {
            insertTable: insertTable.bind(null, opts),
            insertRow: bindAndScopeChange(opts, insertRow),
            removeRow: bindAndScopeChange(opts, removeRow),
            insertColumn: bindAndScopeChange(opts, insertColumn),
            removeColumn: bindAndScopeChange(opts, removeColumn),
            removeTable: bindAndScopeChange(opts, removeTable),
            moveSelection: bindAndScopeChange(opts, moveSelection),
            moveSelectionBy: bindAndScopeChange(opts, moveSelectionBy),
            setColumnAlign: bindAndScopeChange(opts, setColumnAlign),
            setColumnWidth: bindAndScopeChange(opts, setColumnWidth)
        }
    };
}

/**
 * Bind a change to given options, and scope it to act only inside a table
 */
function bindAndScopeChange(opts: Options, fn: *): * {
    return (change, ...args) => {
        const { value } = change;

        if (!isSelectionInTable(opts, value)) {
            return change;
        }

        // $FlowFixMe
        return fn(...[opts, change].concat(args));
    };
}

// Expose aligns here too
core.ALIGN = ALIGN;
core.DIMENSIONS = DIMENSIONS;

export default core;
