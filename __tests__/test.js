'use strict';

var padArray = require('..');

describe('Array test', function () {
  it('Default test', function () {
    var data = [1, 2, 3, 4];
    var model = padArray(data);
    expect(model).toStrictEqual([0, 1, 2, 3, 4, 0]);
  });

  it('Output option test', function () {
    var data = [1, 2, 3, 4];
    var model = new Array(6);
    padArray(data, { output: model });
    expect(model).toStrictEqual([0, 1, 2, 3, 4, 0]);
  });

  it('Replicate test', function () {
    var data = [1, 2, 3, 4];
    var options = {
      size: 3,
      value: 'replicate'
    };
    var model = padArray(data, options);
    expect(model).toStrictEqual([1, 1, 1, 1, 2, 3, 4, 4, 4, 4]);
  });

  it('Circular test', function () {
    var data = [1, 2, 3, 4];
    var options = {
      size: 5,
      value: 'circular'
    };
    var model = padArray(data, options);
    expect(model).toStrictEqual([4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1]);
  });

  it('Symmetric test', function () {
    var data = [1, 2, 3, 4];
    var options = {
      size: 3,
      value: 'symmetric'
    };
    var model = padArray(data, options);
    expect(model).toStrictEqual([3, 2, 1, 1, 2, 3, 4, 4, 3, 2]);
  });

  it('Numeric test', function () {
    var data = [1, 2, 3, 4];
    var options = {
      size: 3,
      value: 8
    };
    var model = padArray(data, options);
    expect(model).toStrictEqual([8, 8, 8, 1, 2, 3, 4, 8, 8, 8]);
  });
});
