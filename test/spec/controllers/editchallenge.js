'use strict';

describe('Controller: EditchallengeCtrl', function () {

  // load the controller's module
  beforeEach(module('lggApp'));

  var EditchallengeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditchallengeCtrl = $controller('EditchallengeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
