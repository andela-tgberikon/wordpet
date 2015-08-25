angular.module("wordpet.services")
.factory('Refs',['$cookies',function($cookies){
  return require('./exports/refs')($cookies);
}]);
