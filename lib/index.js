/* @flow */

import Options, { type OptionsFormat } from './options';
import ALIGN from './ALIGN';
import DIMENSIONS from './DIMENSIONS';
import core from './core';
import { onKeyDown } from './handlers';

/**
 *  Returns the full plugin object (behavior + rendering + schema)
 */
function SimpleTable(
    // The plugin options
    optionsParam?: OptionsFormat
): Object {
    const opts = new Options(optionsParam || {});
    const corePlugin = core(opts);

    return {
        ...corePlugin,

        onKeyDown: onKeyDown.bind(null, opts)
    };
}

// Expose align constants to the plugin
SimpleTable.ALIGN = ALIGN;
SimpleTable.DIMENSIONS = DIMENSIONS;

export default SimpleTable;
