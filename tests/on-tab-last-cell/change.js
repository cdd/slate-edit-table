const expect = require('expect');

module.exports = function(plugin, change) {
    const cursorBlock = change.state.document.getDescendant('_cursor_');
    change.moveToRangeOf(cursorBlock);

    plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'tab' },
        change
    );

    const position = plugin.utils.getPosition(change.state);

    // Last row
    expect(position.getRowIndex()).toEqual(1);
    // Last cell
    expect(position.getColumnIndex()).toEqual(2);

    return change;
};
