'use strict';

const padArray = require('..');
const data = [1, 2, 3, 4];

describe('Array test', function () {

    it('Default test', function () {
        padArray(data).should.eql([0, 1, 2, 3, 4, 0]);
    });

    it('Output option test', function () {
        let model = new Array(6);
        padArray(data, {output: model}).should.eql([0, 1, 2, 3, 4, 0]);
    });

    it('Replicate test', function () {
        let options = {
            size: 3,
            value: 'replicate'
        };
        padArray(data, options).should.eql([1, 1, 1, 1, 2, 3, 4, 4, 4, 4]);
    });

    it('Circular test', function () {
        let options = {
            size: 5,
            value: 'circular'
        };
        padArray(data, options).should.eql([4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1]);
    });

    it('Symmetric test', function () {
        let options = {
            size: 3,
            value: 'symmetric'
        };
        padArray(data, options).should.eql([3, 2, 1, 1, 2, 3, 4, 4, 3, 2]);
    });

    it('Numeric test', function () {
        let options = {
            size: 3,
            value: 8
        };
        padArray(data, options).should.eql([8, 8, 8, 1, 2, 3, 4, 8, 8, 8]);
    });

    it('Errors test', function () {
        padArray.bind(null, 4).should.throw('data should be an array');
        padArray.bind(null, [[1]]).should.throw('matrix not supported yet, sorry');
        padArray.bind(null, data, {output: []}).should.throw('wrong output size');

        let symmetric = {
            size: [8, 2],
            value: 'symmetric'
        };
        padArray.bind(null, data, symmetric).should.throw('expanded value should not be bigger than the data length');
    });
});
