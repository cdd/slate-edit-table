import expect from 'expect';

export default function(plugin, change) {
    const cursorBlock = change.value.document.getDescendant('_cursor_');
    change.moveToRangeOf(cursorBlock);

    plugin.onKeyDown(
        {
            key: 'Tab',
            shiftKey: true,
            preventDefault() {},
            stopPropagation() {}
        },
        change
    );

    const position = plugin.utils.getPosition(change.value);

    // First row
    expect(position.getRowIndex()).toEqual(0);
    // First cell
    expect(position.getColumnIndex()).toEqual(0);

    return change;
}
