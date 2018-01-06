// @flow
import { type Change } from 'slate';

import { TablePosition, createWidths } from '../utils';
import DIMENSIONS from '../DIMENSIONS';
import type Options from '../options';
import setTableWidths from './setTableWidths';

/**
 * Sets column width for a given column
 */
function setColumnWidth(
    opts: Options,
    change: Change,
    cellWidths: string = DIMENSIONS.DEFAULT.WIDTH,
    at: number
): Change {
    const { value } = change;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock);
    const { table } = pos;

    // Figure out column position
    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    const newWidths = createWidths(pos.getWidth(), table.data.get('widths'));
    newWidths[at] = cellWidths;
    return setTableWidths(opts, change, table, newWidths);
}

export default setColumnWidth;
