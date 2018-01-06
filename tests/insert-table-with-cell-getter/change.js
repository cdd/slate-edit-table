import createCell from '../../lib/utils/createCell';

const cellGetter = (x, y) => {
    const letters = ['A', 'B'];
    return createCell('table_cell', `${letters[x]}-${y}`);
};

export default function(plugin, change) {
    const { value } = change;
    const cursorBlock = value.document.getDescendant('_cursor_');

    change.moveToRangeOf(cursorBlock).move(6); // Cursor here: Before|After

    return plugin.changes.insertTable(change, 2, 2, cellGetter);
}
