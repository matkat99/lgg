'use strict';

describe('Service: contactFormRepository', function () {

  // load the service's module
  beforeEach(module('lggApp'));

  // instantiate service
  var contactFormRepository;
  beforeEach(inject(function (_contactFormRepository_) {
    contactFormRepository = _contactFormRepository_;
  }));

  it('should do something', function () {
    expect(!!contactFormRepository).toBe(true);
  });

});
