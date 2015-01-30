'use strict';

describe('Service: challengeRepository', function () {

  // load the service's module
  beforeEach(module('lggApp'));

  // instantiate service
  var challengeRepository;
  beforeEach(inject(function (_challengeRepository_) {
    challengeRepository = _challengeRepository_;
  }));

  it('should do something', function () {
    expect(!!challengeRepository).toBe(true);
  });

});
