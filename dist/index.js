'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var insertTable = require('./transforms/insertTable');
var insertRow = require('./transforms/insertRow');
var removeRow = require('./transforms/removeRow');
var insertColumn = require('./transforms/insertColumn');
var removeColumn = require('./transforms/removeColumn');
var removeTable = require('./transforms/removeTable');
var moveSelection = require('./transforms/moveSelection');
var moveSelectionBy = require('./transforms/moveSelectionBy');
var setColumnAlign = require('./transforms/setColumnAlign');
var setColumnWidth = require('./transforms/setColumnWidth');

var onEnter = require('./onEnter');
var onTab = require('./onTab');
var onBackspace = require('./onBackspace');
var onUpDown = require('./onUpDown');
var ALIGN = require('./ALIGN');
var DIMENSIONS = require('./DIMENSIONS');
var makeSchema = require('./makeSchema');

var KEY_ENTER = 'enter';
var KEY_TAB = 'tab';
var KEY_BACKSPACE = 'backspace';
var KEY_DOWN = 'down';
var KEY_UP = 'up';

/**
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 */
function EditTable(opts) {
    opts = opts || {};
    opts.typeTable = opts.typeTable || 'table';
    opts.typeRow = opts.typeRow || 'table_row';
    opts.typeCell = opts.typeCell || 'table_cell';

    /**
     * Is the selection in a table
     */
    function isSelectionInTable(state) {
        if (!state.selection.startKey) return false;

        var startBlock = state.startBlock;

        // Only handle events in cells

        return startBlock.type === opts.typeCell;
    }

    /**
     * Bind a transform
     */
    function bindTransform(fn) {
        return function (transform) {
            var state = transform.state;


            if (!isSelectionInTable(state)) {
                return transform;
            }

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            return fn.apply(undefined, _toConsumableArray([opts, transform].concat(args)));
        };
    }

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(e, data, state) {
        // Only handle events in cells
        if (!isSelectionInTable(state)) {
            return;
        }

        // Build arguments list
        var args = [e, data, state, opts];

        switch (data.key) {
            case KEY_ENTER:
            case KEY_TAB:
                return onTabEnter.apply(undefined, args);
            case KEY_BACKSPACE:
                return onBackspace.apply(undefined, args);
            case KEY_DOWN:
            case KEY_UP:
                return onUpDown.apply(undefined, args);
        }
    }

    var schema = makeSchema(opts);

    return {
        onKeyDown: onKeyDown,

        schema: schema,

        utils: {
            isSelectionInTable: isSelectionInTable
        },

        transforms: {
            insertTable: insertTable.bind(null, opts),
            insertRow: bindTransform(insertRow),
            removeRow: bindTransform(removeRow),
            insertColumn: bindTransform(insertColumn),
            removeColumn: bindTransform(removeColumn),
            removeTable: bindTransform(removeTable),
            moveSelection: bindTransform(moveSelection),
            moveSelectionBy: bindTransform(moveSelectionBy),
            setColumnAlign: bindTransform(setColumnAlign),
            setColumnWidth: bindTransform(setColumnWidth)
        }
    };
}

// Expose align constants to the plugin
EditTable.ALIGN = ALIGN;
EditTable.DIMENSIONS = DIMENSIONS;

module.exports = EditTable;