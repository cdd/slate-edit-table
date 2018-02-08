// @flow
import { type Change, type Block } from 'slate';
import type Options from '../options';
import getAdjustedRow from '../helpers/getAdjustedRow';

/**
 * Sets column width for a table
 */
function setTableWidths(
    opts: Options,
    change: Change,
    table: Block,
    widths: Array<string>
): Change {
    const data = table.data.set('widths', widths)

    change.setNodeByKey(table.key, { data });

    return change;
}
export default setTableWidths;
