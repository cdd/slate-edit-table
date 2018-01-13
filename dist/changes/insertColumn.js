'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _immutable = require('immutable');

var _utils = require('../utils');

var _changes = require('../changes');

var _ALIGN = require('../ALIGN');

var _ALIGN2 = _interopRequireDefault(_ALIGN);

var _DIMENSIONS = require('../DIMENSIONS');

var _DIMENSIONS2 = _interopRequireDefault(_DIMENSIONS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Insert a new column in current table
 */
function insertColumn(opts, change, at) {
    var columnAlign = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _ALIGN2.default.DEFAULT;
    var columnWidth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _DIMENSIONS2.default.DEFAULT.WIDTH;
    var value = change.value;
    var startBlock = value.startBlock;


    var pos = _utils.TablePosition.create(value, startBlock);
    var table = pos.table;


    if (typeof at === 'undefined') {
        at = pos.getColumnIndex() + 1;
    }

    // Insert the new cell
    table.nodes.forEach(function (row) {
        var newCell = (0, _utils.createCell)(opts.typeCell);
        newCell = newCell.setIn(['data', 'textAlign'], _ALIGN2.default.DEFAULT);
        change.insertNodeByKey(row.key, at, newCell, { normalize: false });
    });

    // Update alignment
    var presetAlign = table.data.get('presetAlign');
    presetAlign = (0, _immutable.List)(presetAlign).insert(at, columnAlign).toArray();
    var widths = table.data.get('widths');
    widths = (0, _immutable.List)(widths).insert(at, columnWidth).toArray();

    change.setNodeByKey(table.key, {
        data: table.data.set('presetAlign', presetAlign).set('widths', widths)
    });

    // Update the selection (not doing can break the undo)
    return (0, _changes.moveSelection)(opts, change, at, pos.getRowIndex());
}

exports.default = insertColumn;