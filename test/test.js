'use strict';

var padArray = require('..');

describe('Array test', function () {

    it('Default test', function () {
        var data = [1, 2, 3, 4];
        var model = padArray(data);
        // model.should.equal([0, 1, 2, 3, 4, 0]);
        model[0].should.equal(0);
    });

    it('Output option test', function () {
        var data = [1, 2, 3, 4];
        var model = new Array(6);
        padArray(data, {output: model});
        model[0].should.equal(0);
    });

    it('Replicate test', function () {
        var data = [1, 2, 3, 4];
        var options = {
            padsize: 3,
            padval: 'replicate'
        };
        var model = padArray(data, options);
        model[0].should.equal(1);
    });

    it('Circular test', function () {
        var data = [1, 2, 3, 4];
        var options = {
            padsize: 5,
            padval: 'circular'
        };
        var model = padArray(data, options);
        model[0].should.equal(4);
    });

    it('Symmetric test', function () {
        var data = [1, 2, 3, 4];
        var options = {
            padsize: 3,
            padval: 'symmetric'
        };
        var model = padArray(data, options);
        model[0].should.equal(3);
    });

    it('Numeric test', function () {
        var data = [1, 2, 3, 4];
        var options = {
            padsize: 3,
            padval: 8
        };
        var model = padArray(data, options);
        model[0].should.equal(8);
    });
});