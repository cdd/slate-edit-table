const cellGetter = (x, y) => {
  const letters = ['A', 'B']

  return `${letters[x]}-${y}`
}

module.exports = function(plugin, change) {
    const { state } = change;
    const cursorBlock = state.document.getDescendant('_cursor_');
    change
        .moveToRangeOf(cursorBlock)
        .move(6); // Cursor here: Before|After

    return plugin.changes.insertTable(change, 2, 2, cellGetter)
};
