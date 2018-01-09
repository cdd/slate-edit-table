'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _utils = require('../utils');

var _changes = require('../changes');

function onUpDown(event, change, editor, opts) {
    var direction = event.key === 'ArrowUp' ? -1 : +1;
    var pos = _utils.TablePosition.create(change.value, change.value.startBlock);

    if (pos.isFirstRow() && direction === -1 || pos.isLastRow() && direction === +1) {
        // Let the default behavior move out of the table
        return undefined;
    }
    event.preventDefault();

    (0, _changes.moveSelectionBy)(opts, change, 0, event.key === 'ArrowUp' ? -1 : +1);

    return change;
}
exports.default = onUpDown;