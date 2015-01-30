'use strict';

describe('Service: achievementRepository', function () {

  // load the service's module
  beforeEach(module('lggApp'));

  // instantiate service
  var achievementRepository;
  beforeEach(inject(function (_achievementRepository_) {
    achievementRepository = _achievementRepository_;
  }));

  it('should do something', function () {
    expect(!!achievementRepository).toBe(true);
  });

});
