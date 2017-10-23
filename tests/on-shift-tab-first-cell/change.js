const expect = require('expect');

module.exports = function(plugin, change) {
    const cursorBlock = change.state.document.getDescendant('_cursor_');
    change.moveToRangeOf(cursorBlock);

    plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {},
            key: 'Tab',
            shiftKey: true
        },
        change
    );

    const position = plugin.utils.getPosition(change.state);

    // First row
    expect(position.getRowIndex()).toEqual(0);
    // First cell
    expect(position.getColumnIndex()).toEqual(0);

    return change;
};
