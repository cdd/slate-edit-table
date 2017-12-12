const TablePosition = require('../TablePosition');

/**
 * Delete current column in a table
 */
function removeColumn(opts: Options, change: Change, at: number): Change {
    const { value } = change;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    const rows = table.nodes;

    // Remove the cell from every row
    if (pos.getWidth() > 1) {
        rows.forEach(row => {
            const cell = row.nodes.get(at);
            change.removeNodeByKey(cell.key, { normalize: false });
        });

        // Update alignment
        let align = table.data.get('align', []);
        align.splice(at, 1);

        let widths = table.data.get('widths', []);
        widths.splice(at, 1);

        change = change.setNodeByKey(table.key, {
            data: {
                align,
                widths
            }
        });
    } else {
        // If last column, clear text in cells instead
        rows.forEach(row => {
            row.nodes.forEach(cell => {
                cell.nodes.forEach(node => {
                    // We clear the texts in the cells
                    change.removeNodeByKey(node.key);
                });
            });
        });
    }

    // Replace the table
    return change;
}

export default removeColumn;
