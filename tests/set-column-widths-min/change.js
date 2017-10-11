module.exports = function(plugin, change) {
    const { state } = change;

    const cursorBlock = state.document.getDescendant('_cursor');
    change.moveToRangeOf(cursorBlock);

    return plugin.changes.setColumnWidth(change, -10);
};
