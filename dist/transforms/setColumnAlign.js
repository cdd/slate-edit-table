'use strict';

var TablePosition = require('../TablePosition');
var ALIGN = require('../ALIGN');
var createAlign = require('../createAlign');

/**
 * Sets column alignment for a given column
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} at
 * @param {String} align
 * @return {Slate.Transform}
 */
function setColumnAlign(opts, transform) {
    var align = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ALIGN.DEFAULT;
    var at = arguments[3];
    var state = transform.state;
    var startBlock = state.startBlock;


    var pos = TablePosition.create(state, startBlock);
    var table = pos.table;

    // Figure out column position

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    var newAlign = createAlign(pos.getWidth(), table.data.get('align'));
    newAlign[at] = align;

    transform.setNodeByKey(table.key, {
        data: {
            align: newAlign
        }
    });

    return transform;
}

module.exports = setColumnAlign;