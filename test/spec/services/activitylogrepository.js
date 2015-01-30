'use strict';

describe('Service: activityLogRepository', function () {

  // load the service's module
  beforeEach(module('lggApp'));

  // instantiate service
  var activityLogRepository;
  beforeEach(inject(function (_activityLogRepository_) {
    activityLogRepository = _activityLogRepository_;
  }));

  it('should do something', function () {
    expect(!!activityLogRepository).toBe(true);
  });

});
