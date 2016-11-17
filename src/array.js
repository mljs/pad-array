'use strict';

const defaultOptions = {
    size: 1,
    value: 0
};

/**
 * Case when the entry is an array
 * @param {Array} data - Array of elements to be padded
 * @param {object} [options] - Same options than padArray
 * @return {Array} - Padded array of elements
 */
function arrayCase(data, options) {
    options = Object.assign({}, defaultOptions, options);

    const len = data.length;
    if (typeof options.size === 'number') {
        options.size = [options.size, options.size];
    }

    const cond = len + options.size[0] + options.size[1];

    let output;
    if (options.output) {
        if (options.output.length !== cond) {
            throw new RangeError('wrong output size');
        }
        output = options.output;
    } else {
        output = new Array(cond);
    }

    if (options.value === 'circular') {
        // circular option
        for (let i = 0; i < cond; i++) {
            if (i < options.size[0]) {
                output[i] = data[((len - (options.size[0] % len)) + i) % len];
            } else if (i < (options.size[0] + len)) {
                output[i] = data[i - options.size[0]];
            } else {
                output[i] = data[(i - options.size[0]) % len];
            }
        }
    } else if (options.value === 'replicate') {
        // replicate option
        for (let i = 0; i < cond; i++) {
            if (i < options.size[0]) {
                output[i] = data[0];
            } else if (i < (options.size[0] + len)) {
                output[i] = data[i - options.size[0]];
            } else {
                output[i] = data[len - 1];
            }
        }
    } else if (options.value === 'symmetric') {
        // symmetric option
        if ((options.size[0] > len) || (options.size[1] > len)) {
            throw new RangeError('expanded value should not be bigger than the data length');
        }
        for (let i = 0; i < cond; i++) {
            if (i < options.size[0]) {
                output[i] = data[options.size[0] - 1 - i];
            } else if (i < (options.size[0] + len)) {
                output[i] = data[i - options.size[0]];
            } else {
                output[i] = data[2 * len + options.size[0] - i - 1];
            }
        }
    } else {
        // default option
        for (let i = 0; i < cond; i++) {
            if (i < options.size[0]) {
                output[i] = options.value;
            } else if (i < (options.size[0] + len)) {
                output[i] = data[i - options.size[0]];
            } else {
                output[i] = options.value;
            }
        }
    }

    return output;
}

module.exports = arrayCase;
