'use strict';

const arrayCase = require('./array');
const matrixCase = require('./matrix');

/**
 * Pads and array
 * @param {Array|Array<Array>} data - Array or matrix to be padded
 * @param {object} [options] - Options object
 * @param {number|Array<number>} [options.size = 1] - Defines the number of fields that will be expanded
 *  * If the value is  a number it will expand in all directions with that size.
 *  * If the value is an array of numbers it will expand in each direction given the values, for the array case the two values are `left and right` and for the matrix case are `left, up, right, down`
 * @param {*|string} [options.value = 0] - Determine how to fill the values, if the value don't match with the next strings, the new values are going to be filled with that value.
 *  * `'circular'`: Pad with circular repetition of elements within the dimension.
 *  * `'replicate'`: Pad by repeating border elements of array.
 *  * `'symmetric'`: Pad array with mirror reflections of itself. In this case the `size` shouldn't be bigger than the dimensions.
 *  * @param {Array} [options.output = false] - Instead of creating a new array, the returned value should be in this variable.
 * @return {Array} - Padded array or matrix of elements
 */
function padArray(data, options) {
    if (Array.isArray(data)) {
        if (Array.isArray(data[0])) {
            return matrixCase(data, options);
        } else {
            return arrayCase(data, options);
        }
    } else {
        throw new TypeError('data should be an array');
    }
}

module.exports = padArray;
