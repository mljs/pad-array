'use strict';

var defaultOptions = {
    padsize: 1,
    padval: 0,
    direction: 'both'
};

/**
 * Pads and array
 * @param {Array <number>} data
 * @param {object} options
 */
function padArray (data, options) {
    options = options || {};
    for (var o in defaultOptions)
        if (!(options[o]))
            options[o] = defaultOptions[o];
    return data;
}

module.exports = padArray;
