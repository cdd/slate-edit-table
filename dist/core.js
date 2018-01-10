'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _changes = require('./changes');

var _utils = require('./utils');

var _validation = require('./validation');

var _ALIGN = require('./ALIGN');

var _ALIGN2 = _interopRequireDefault(_ALIGN);

var _DIMENSIONS = require('./DIMENSIONS');

var _DIMENSIONS2 = _interopRequireDefault(_DIMENSIONS);

var _options = require('./options');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Returns the core of the plugin, limited to the validation and normalization
 * part of `slate-simple-table`, and utils.
 *
 * Import this directly: `import SimpleTable from 'slate-edit-table/lib/core'`
 * if you don't care about behavior/rendering and you
 * are only manipulating `Slate.Values` without rendering them.
 * That way you do not depend on `slate-react`.
 */
function core(optionsParam) {
    var opts = new _options2.default(optionsParam);

    return {
        schema: (0, _validation.schema)(opts),
        validateNode: (0, _validation.validateNode)(opts),

        utils: {
            createTable: _utils.createTable.bind(null, opts),
            isSelectionInTable: _utils.isSelectionInTable.bind(null, opts),
            isSelectionOutOfTable: _utils.isSelectionOutOfTable.bind(null, opts),
            getPosition: _utils.getPosition.bind(null, opts)
        },

        changes: {
            insertTable: _changes.insertTable.bind(null, opts),
            insertRow: bindAndScopeChange(opts, _changes.insertRow),
            removeRow: bindAndScopeChange(opts, _changes.removeRow),
            insertColumn: bindAndScopeChange(opts, _changes.insertColumn),
            removeColumn: bindAndScopeChange(opts, _changes.removeColumn),
            removeTable: bindAndScopeChange(opts, _changes.removeTable),
            moveSelection: bindAndScopeChange(opts, _changes.moveSelection),
            moveSelectionBy: bindAndScopeChange(opts, _changes.moveSelectionBy),
            setColumnAlign: bindAndScopeChange(opts, _changes.setColumnAlign),
            setColumnWidth: bindAndScopeChange(opts, _changes.setColumnWidth)
        }
    };
}

/**
 * Bind a change to given options, and scope it to act only inside a table
 */
function bindAndScopeChange(opts, fn) {
    return function (change) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        var value = change.value;


        if (!(0, _utils.isSelectionInTable)(opts, value)) {
            return change;
        }

        // $FlowFixMe
        return fn.apply(undefined, _toConsumableArray([opts, change].concat(args)));
    };
}

// Expose aligns here too
core.ALIGN = _ALIGN2.default;
core.DIMENSIONS = _DIMENSIONS2.default;

exports.default = core;