// @flow
import { type Change, type Block } from 'slate';
import type Options from '../options';
import getAdjustedRow from '../helpers/getAdjustedRow';

/**
 * Sets column width for a given column
 */
function setTableWidths(
    opts: Options,
    change: Change,
    table: Block,
    widths: Array<string>
): Change {
    const nextTable = table
        .set('nodes', table.nodes.map(row => getAdjustedRow(row, widths)))
        .setIn(['data', 'widths'], widths);

    // To restore selection, the following code function like change.replaceNodeByKey(table.key, nextTable).focus();
    change.setNodeByKey(table.key, { data: nextTable.data });
    table.nodes.forEach((row, rowIndex) => {
        row.nodes.forEach((cell, cellIndex) => {
            const nextCell = nextTable.nodes.get(rowIndex).nodes.get(cellIndex);
            if (nextCell === cell) {
                return cellIndex;
            }
            change.setNodeByKey(cell.key, { data: nextCell.data });
            return cellIndex;
        });
        return rowIndex;
    });

    return change;
}
export default setTableWidths;
