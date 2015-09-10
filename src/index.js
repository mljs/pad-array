'use strict';

var defaultOptions = {
    padsize: 1,
    padval: 0
};

/**
 * Case when the entry is an array
 * @param data
 * @param options
 * @returns {Array}
 */
function arrayCase(data, options) {
    var len = data.length;
    if (options.padsize[0] === undefined)
        options.padsize = [options.padsize, options.padsize];

    var cond = len + options.padsize[0] + options.padsize[1];

    if (options.output) {
        if (options.output.length !== cond)
            throw new RangeError('Wrong output size');
    }
    else
        options.output = new Array(cond);

    var i;

    // circular option
    if (options.padval === 'circular') {
        for (i = 0; i < cond; i++) {
            if (i < options.padsize[0])
                options.output[i] = data[((len - (options.padsize[0] % len)) + i) % len];
            else if (i < (options.padsize[0] + len))
                options.output[i] = data[i - options.padsize[0]];
            else
                options.output[i] = data[(i - options.padsize[0]) % len];
        }
    }

    // replicate option
    else if (options.padval === 'replicate') {
        for (i = 0; i < cond; i++) {
            if (i < options.padsize[0])
                options.output[i] = data[0];
            else if (i < (options.padsize[0] + len))
                options.output[i] = data[i - options.padsize[0]];
            else
                options.output[i] = data[len - 1];
        }
    }

    // symmetric option
    else if (options.padval === 'symmetric') {
        if ((options.padsize[0] > len) || (options.padsize[1] > len))
            throw new RangeError('expanded value should not be bigger than the data length');
        for (i = 0; i < cond; i++) {
            if (i < options.padsize[0])
                options.output[i] = data[options.padsize[0] - 1 - i];
            else if (i < (options.padsize[0] + len))
                options.output[i] = data[i - options.padsize[0]];
            else
                options.output[i] = data[2*len + options.padsize[0] - i - 1];
        }
    }

    // default option
    else {
        for (i = 0; i < cond; i++) {
            if (i < options.padsize[0])
                options.output[i] = options.padval;
            else if (i < (options.padsize[0] + len))
                options.output[i] = data[i - options.padsize[0]];
            else
                options.output[i] = options.padval;
        }
    }

    return options.output;
}

/**
 * Case when the entry is a matrix
 * @param data
 * @param options
 * @returns {Array}
 */
function matrixCase(data, options) {
    var row = data.length;
    var col = data[0].length;
    if (options.padsize[0] === undefined)
        options.padsize = [options.padsize, options.padsize, options.padsize, options.padsize];
    throw new Error('matrix not supported yet, sorry');
}

/**
 * Pads and array
 * @param {Array <number>} data
 * @param {object} options
 */
function padArray (data, options) {
    options = options || {};
    options.padsize = options.padsize || defaultOptions.padsize;
    options.padval  = options.padval  || defaultOptions.padval;

    if (Array.isArray(data)) {
        if (Array.isArray(data[0]))
            return matrixCase(data, options);
        else
            return arrayCase(data, options);
    }
    else
        throw new TypeError('data should be an array');
}

module.exports = padArray;
