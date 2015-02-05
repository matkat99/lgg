'use strict';

describe('Service: eventRepository', function () {

  // load the service's module
  beforeEach(module('lggApp'));

  // instantiate service
  var eventRepository;
  beforeEach(inject(function (_eventRepository_) {
    eventRepository = _eventRepository_;
  }));

  it('should do something', function () {
    expect(!!eventRepository).toBe(true);
  });

});
