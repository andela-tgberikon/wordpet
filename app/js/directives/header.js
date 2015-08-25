angular.module("wordpet.directives")
  .directive('header', function() {
    return {
      restrict: 'E',
      controller: ['$rootScope', '$scope', 'Authentication',
       function($rootScope, $scope, Authentication) {

        $scope.login = function() {
          Authentication.login();
        };

        $scope.logout = function() {
          Authentication.logout();
        };
      }]
    };
  });
