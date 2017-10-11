import createCell from '../../lib/createCell.js'

const cellGetter = (x, y) => {
  const letters = ['A', 'B']

  return createCell('table_cell', `${letters[x]}-${y}`)
}

module.exports = function(plugin, change) {
    const { state } = change;
    const cursorBlock = state.document.getDescendant('_cursor_');

    change
        .moveToRangeOf(cursorBlock)
        .move(6); // Cursor here: Before|After

    return plugin.changes.insertTable(change, 2, 2, cellGetter);
};
