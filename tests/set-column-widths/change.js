export default function(plugin, change) {
    const { value } = change;

    const cursorBlock = value.document.getDescendant('_cursor');
    change.moveToRangeOf(cursorBlock);
    return plugin.changes.setColumnWidth(change, 50);
}
