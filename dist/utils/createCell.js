'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slate = require('slate');

/**
 * Create a new cell
 */
function createCell(type) {
    var contents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (typeof contents === 'string') {
        contents = _slate.Text.fromJSON({
            kind: 'text',
            text: contents
        });
    }

    var nodes = contents instanceof Array ? contents : [contents];

    return _slate.Block.create({ type: type, nodes: nodes });
}
exports.default = createCell;