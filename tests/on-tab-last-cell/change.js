import expect from 'expect';

export default function(plugin, change) {
    const cursorBlock = change.value.document.getDescendant('_cursor_');
    change.moveToRangeOf(cursorBlock);

    plugin.onKeyDown(
        {
            key: 'Tab',
            preventDefault() {},
            stopPropagation() {},
            key: 'tab'
        },
        change
    );

    const position = plugin.utils.getPosition(change.value);

    // Last row
    expect(position.getRowIndex()).toEqual(1);
    // Last cell
    expect(position.getColumnIndex()).toEqual(2);

    return change;
}
