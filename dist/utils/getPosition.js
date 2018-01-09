'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _TablePosition = require('./TablePosition');

var _TablePosition2 = _interopRequireDefault(_TablePosition);

var _isSelectionInTable = require('./isSelectionInTable');

var _isSelectionInTable2 = _interopRequireDefault(_isSelectionInTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The position of the selection start block, in the current table
 * @throws {Error} If the start of the selection is not in a table
 */
function getPosition(opts,
// The current value
value) {
    if (!(0, _isSelectionInTable2.default)(opts, value)) {
        throw new Error('Not in a table');
    }
    var cell = value.startBlock;
    return _TablePosition2.default.create(value, cell);
}
exports.default = getPosition;