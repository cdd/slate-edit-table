'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slate = require('slate');

var _immutable = require('immutable');

/**
 * Create a new cell
 */
function createCell(type) {
    var contents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var nodes = void 0;

    if (typeof contents === 'string') {
        nodes = [_slate.Text.create(contents)];
    } else if (_immutable.List.isList(contents)) {
        nodes = contents.toArray();
    } else if (contents instanceof Array) {
        nodes = contents;
    } else {
        nodes = [contents];
    }

    return _slate.Block.create({ type: type, nodes: nodes });
}

exports.default = createCell;