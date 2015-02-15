'use strict';

describe('Service: calcProgress', function () {

  // load the service's module
  beforeEach(module('lggApp'));

  // instantiate service
  var calcProgress;
  beforeEach(inject(function (_calcProgress_) {
    calcProgress = _calcProgress_;
  }));

  it('should do something', function () {
    expect(!!calcProgress).toBe(true);
  });

});
