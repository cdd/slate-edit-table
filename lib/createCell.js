const Slate = require('slate');

/**
 * Create a new cell
 * @param {String} type
 * @param {String | Node | Array} contents?
 * @return {Slate.Node}
 */
function createCell(type, contents) {
    contents = contents || ''

    if (typeof contents === 'string') {
        contents = Slate.Text.fromJSON({
            kind: 'text',
            text: contents
        })
    }

    const nodes = contents instanceof Array ? contents : [contents]

    return Slate.Block.create({ type, nodes });
}

module.exports = createCell;
