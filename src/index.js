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

    var ans = new Array(len + options.padsize[0] + options.padsize[1]);

    // circular option
    if (options.padval === 'circular') {
        for (var i = 0; i < (len + options.padsize[0] + options.padsize[1]); i++) {
            if (i < options.padsize[0])
                ans[i] = data[((len - (options.padsize[0] % len)) + i) % len];
            else if (i < (options.padsize[0] + len))
                ans[i] = data[i - options.padsize[0]];
            else
                ans[i] = data[(i - options.padsize[0]) % len];
        }
    }

    // replicate option
    else if (options.padval === 'replicate') {
        if ((options.padsize[0] > len) || (options.padsize[1] > len))
            throw new RangeError('expanded value should not be bigger than the data length');
        for (var j = 0; j < (len + options.padsize[0] + options.padsize[1]); j++) {
            if (j < options.padsize[0])
                ans[j] = data[0];
            else if (j < (options.padsize[0] + len))
                ans[j] = data[j - options.padsize[0]];
            else
                ans[j] = data[len - 1];
        }
    }

    // symmetric option
    else if (options.padval === 'symmetric') {
        if ((options.padsize[0] > len) || (options.padsize[1] > len))
            throw new RangeError('expanded value should not be bigger than the data length');
        for (var k = 0; k < (len + options.padsize[0] + options.padsize[1]); k++) {
            if (k < options.padsize[0])
                ans[k] = data[options.padsize[0] - 1 - k];
            else if (k < (options.padsize[0] + len))
                ans[k] = data[k - options.padsize[0]];
            else
                ans[k] = data[2*len + options.padsize[0] - k - 1];
        }
    }

    // default option
    else {
        for (var l = 0; l < (len + options.padsize[0] + options.padsize[1]); l++) {
            if (l < options.padsize[0])
                ans[l] = options.padval;
            else if (l < (options.padsize[0] + len))
                ans[l] = data[l - options.padsize[0]];
            else
                ans[l] = options.padval;
        }
    }

    return ans;
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

    if (data[0] === undefined)
        throw new TypeError('data should be an array');
    else if (data[0][0] === undefined)
        return arrayCase(data, options);
    else
        return matrixCase(data, options);
}

module.exports = padArray;
