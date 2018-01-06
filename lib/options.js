// @flow

import { Record } from 'immutable';
import DIMENSIONS from './DIMENSIONS';

export type OptionsFormat = {
    typeTable?: string,
    typeRow?: string,
    typeCell?: string,
    exitBlockType?: string,
    minWidth?: number
};

/**
 * The plugin options
 */
class Options extends Record({
    typeTable: 'table',
    typeRow: 'table_row',
    typeCell: 'table_cell',
    exitBlockType: 'paragraph',
    minWidth: DIMENSIONS.MIN.WIDTH
}) {
    // The type of table blocks
    typeTable: string;
    // The type of row blocks
    typeRow: string;
    // The type of cell blocks
    typeCell: string;
    // The type of block inserted when exiting
    exitBlockType: string;
    // The minimum column width
    minWidth: DIMENSIONS.MIN.WIDTH;
}

export default Options;
