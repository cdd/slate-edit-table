// @flow
import { Block, Text } from 'slate';

/**
 * Create a new cell
 */
function createCell(type: string, contents?: string | object[] = ''): Block {
    if (typeof contents === 'string') {
        contents = Text.fromJSON({
            kind: 'text',
            text: contents
        });
    }

    const nodes = contents instanceof Array ? contents : [contents];

    return Block.create({ type, nodes });
}

export default createCell;
