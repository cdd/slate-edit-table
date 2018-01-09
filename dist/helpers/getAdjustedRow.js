'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

function getAdjustedRow(row, presetAlign) {
    if (!presetAlign) {
        return row;
    }
    var nodes = row.nodes;
    var nextRow = row.set('nodes', nodes.map(function (cell, index) {
        if (cell.data.get('textAlign') === presetAlign[index]) {
            return cell;
        }
        return cell.setIn(['data', 'textAlign'], presetAlign[index]);
    }));
    return nextRow;
}
exports.default = getAdjustedRow;