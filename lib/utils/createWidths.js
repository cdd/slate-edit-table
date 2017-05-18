// @flow
import { Range } from 'immutable';
import DIMENSIONS from '../DIMENSIONS';

/**
 * Create a set of widths
 * @param  {Number} columns
 * @param  {List} base
 * @return {List} list
 */
function createWidths(columns: number, base: string[] = []): string[] {
    return Range(0, columns)
        .map(i => base[i] || DIMENSIONS.DEFAULT.WIDTH)
        .toArray();
}

export default createWidths;
