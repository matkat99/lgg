'use strict';

describe('Directive: award', function () {

  // load the directive's module
  beforeEach(module('lggApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<award></award>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the award directive');
  }));
});
