// @flow
import { type Change } from 'slate';
import { List } from 'immutable';

import { TablePosition, createCell } from '../utils';
import { moveSelection } from '../changes';

import ALIGN from '../ALIGN';
import DIMENSIONS from '../DIMENSIONS';

import type Options from '../options';

/**
 * Insert a new column in current table
 */
function insertColumn(
    opts: Options,
    change: Change,
    at?: number, // Column index
    columnAlign: string = ALIGN.DEFAULT,
    columnWidth: number = DIMENSIONS.DEFAULT.WIDTH
) {
    const { value } = change;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex() + 1;
    }

    // Insert the new cell
    table.nodes.forEach(row => {
        let newCell = createCell(opts.typeCell);
        newCell = newCell.setIn(['data', 'textAlign'], ALIGN.DEFAULT);
        change.insertNodeByKey(row.key, at, newCell, { normalize: false });
    });

    // Update alignment
    let presetAlign = table.data.get('presetAlign');
    presetAlign = List(presetAlign)
        .insert(at, columnAlign)
        .toArray();
    let widths = table.data.get('widths');
    widths = List(widths)
        .insert(at, columnWidth)
        .toArray();

    change.setNodeByKey(table.key, {
        data: table.data.set('presetAlign', presetAlign).set('widths', widths)
    });

    // Update the selection (not doing can break the undo)
    return moveSelection(opts, change, at, pos.getRowIndex());
}

export default insertColumn;
