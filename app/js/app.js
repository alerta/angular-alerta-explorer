'use strict';


// Declare app level module which depends on filters, and services
angular.module('explorer', [
  'config',
  'ngRoute',
  'explorer.services',
  'explorer.controllers'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/query', {templateUrl: 'partials/query.html', controller: 'QueryController'});
  $routeProvider.when('/send', {templateUrl: 'partials/send.html', controller: 'SendController'});
  $routeProvider.otherwise({redirectTo: '/query'});
}]);