'use strict';

describe('Service: checkAchievements', function () {

  // load the service's module
  beforeEach(module('lggApp'));

  // instantiate service
  var checkAchievements;
  beforeEach(inject(function (_checkAchievements_) {
    checkAchievements = _checkAchievements_;
  }));

  it('should do something', function () {
    expect(!!checkAchievements).toBe(true);
  });

});
