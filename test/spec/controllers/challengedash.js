'use strict';

describe('Controller: ChallengedashCtrl', function () {

  // load the controller's module
  beforeEach(module('lggApp'));

  var ChallengedashCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChallengedashCtrl = $controller('ChallengedashCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
