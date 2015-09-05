'use strict';

var padArray = require('..');

describe('Pad array test', function () {

    it('Default test', function () {
        var data = new Array(200);
        for (var i = 0; i < data.length; i++)
            data[i] = Math.sin(i);
        var model = padArray(data);
    });
});