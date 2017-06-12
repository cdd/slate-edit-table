import createCell from '../../lib/createCell.js'

const cellGetter = (x, y) => {
  const letters = ['A', 'B']

  return createCell('table_cell', `${letters[x]}-${y}`)
}

module.exports = function(plugin, state) {
    const cursorBlock = state.document.getDescendant('_cursor_');
    const transform = state.transform();
    state = transform
        .moveToRangeOf(cursorBlock)
        .move(6) // Cursor here: Before|After
        .apply();

    return plugin.transforms.insertTable(state.transform(), 2, 2, cellGetter)
        .apply();
};
