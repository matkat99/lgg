'use strict';

describe('Service: challengeDataRepository', function () {

  // load the service's module
  beforeEach(module('lggApp'));

  // instantiate service
  var challengeDataRepository;
  beforeEach(inject(function (_challengeDataRepository_) {
    challengeDataRepository = _challengeDataRepository_;
  }));

  it('should do something', function () {
    expect(!!challengeDataRepository).toBe(true);
  });

});
