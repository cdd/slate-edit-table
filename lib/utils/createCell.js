// @flow
import { Block, Text } from 'slate';
import { List } from 'immutable';

/**
 * Create a new cell
 */
function createCell(type: string, contents?: string | object[] = ''): Block {
    let nodes;

    if (typeof contents === 'string') {
        nodes = [Text.create(contents)];
    } else if (List.isList(contents)) {
        nodes = contents.toArray();
    } else if (contents instanceof Array) {
        nodes = contents;
    } else {
        nodes = [contents];
    }

    return Block.create({ type, nodes });
}

export default createCell;
