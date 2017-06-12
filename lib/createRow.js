const Immutable = require('immutable');
const Slate = require('slate');
const createCell = require('./createCell');

/**
 * Create a new row block
 *
 * @param {Object} opts
 * @param {Number} columns
 * @param {Function} cellGetter
 * @return {State.Block}
 */
function createRow(opts, columns, cellGetter) {
    const cellNodes = Immutable.Range(0, columns)
        .map(i => {
            let cell = cellGetter ? cellGetter(i) : ''

            if (cell instanceof Slate.Block && cell.type === opts.typeCell) {
                return cell;
            } else {
                return createCell(opts.typeCell, cell);
            }
        })
        .toList();

    return Slate.Block.create({
        type:  opts.typeRow,
        nodes: cellNodes
    });
}

module.exports = createRow;
