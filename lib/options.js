const { Record } = require('immutable');

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
class Options extends new Record(DEFAULTS) {}

module.exports = Options;
