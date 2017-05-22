// @flow

const DIMENSIONS = require('./DIMENSIONS.js');

const DEFAULTS = {
    // The type of table blocks
    typeTable: 'table',
    // The type of row blocks
    typeRow: 'table_row',
    // The type of cell blocks
    typeCell: 'table_cell',
    // The type of block inserted when exiting
    exitBlockType: 'paragraph',
    // The minimum cell width
    minWidth: DIMENSIONS.MIN.WIDTH,
};

/**
 * The plugin options
 */
class Options extends Record({
    typeTable: 'table',
    typeRow: 'table_row',
    typeCell: 'table_cell',
    exitBlockType: 'paragraph'
}) {
    // The type of table blocks
    typeTable: string;
    // The type of row blocks
    typeRow: string;
    // The type of cell blocks
    typeCell: string;
    // The type of block inserted when exiting
    exitBlockType: string;
}

export default Options;
