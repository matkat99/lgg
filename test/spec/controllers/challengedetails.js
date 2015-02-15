'use strict';

describe('Controller: ChallengedetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('lggApp'));

  var ChallengedetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChallengedetailsCtrl = $controller('ChallengedetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
