angular.module("wordpet.controllers")
  .controller('Search', ['$scope', '$mdSidenav', '$location', '$state', 'Utils', '$http', 'Svc',
    function($scope, $mdSidenav, $location, $state, Utils, $http, Svc) {
      $scope.results = Svc.getVal();
      //console.log($scope.results);
      //this is a temporal fix that sends the user back to the home page when the page is refresed, instead of dumping an empty page, the better thing to do is to create an alert page to inform the user that there is currently no data to display.

      //This would hold true for not logged in user "maybe", but a query could be done on current session, assign the not logged in user a session key and use that to populate data so that the last searched term can be retrieved from firebase whenever the search results page is navigated away from.
      if(angular.isUndefined($scope.results)){
        Utils.toast('Unfortunately, no search data has been found, returning to home page');
        $location.path('/');
      }
    }
  ]);