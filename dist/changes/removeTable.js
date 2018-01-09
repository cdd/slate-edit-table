'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _utils = require('../utils');

/**
 * Delete the whole table at position
 */
function removeTable(opts, change) {
    var value = change.value;
    var startBlock = value.startBlock;


    var pos = _utils.TablePosition.create(value, startBlock);
    var table = pos.table;


    return change.removeNodeByKey(table.key);
}

exports.default = removeTable;