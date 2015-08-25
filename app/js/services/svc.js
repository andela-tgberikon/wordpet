angular.module("wordpet.services")
.factory('Svc',['Refs','$rootScope','$firebase', function(Refs, $rootScope,$firebase) {
	return require('./exports/svc')(Refs.root, $rootScope, $firebase);
}]);
