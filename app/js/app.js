'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/query', {templateUrl: 'partials/query.html', controller: 'QueryController'});
  $routeProvider.when('/send', {templateUrl: 'partials/send.html', controller: 'SendController'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
