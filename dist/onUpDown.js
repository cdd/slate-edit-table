'use strict';

var TablePosition = require('./TablePosition');
var moveSelectionBy = require('./transforms/moveSelectionBy');

function onUpDown(event, data, state, opts) {

    var direction = data.key === 'up' ? -1 : +1;
    var pos = TablePosition.create(state, state.startBlock);

    if (pos.isFirstRow() && direction === -1 || pos.isLastRow() && direction === +1) {
        // Let the default behavior move out of the table
        return state;
    } else {
        event.preventDefault();

        var transform = state.transform();
        transform = moveSelectionBy(opts, transform, 0, data.key === 'up' ? -1 : +1);

        return transform.apply();
    }
}

module.exports = onUpDown;