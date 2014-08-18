'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('QueryController', ['$scope', '$http', function($scope, $http) {

    $scope.query = 'http://alerta.guprod.gnm:8080/api/alerts?limit=10';

    $scope.severity = 'normal';

    $scope.resource = '';
    $scope.event = '';
    $scope.group = '';

    $scope.services = '';
    $scope.environment = '';

    $scope.value = '';
    $scope.text = '';

    $scope.tags = '';
    //$scope.attributes = '';

    $scope.apikey = '';

    $scope.update = function() {
      $scope.query = 'http://alerta.guprod.gnm:8080/api/alerts?limit=10';
      //if ($scope.severity) $scope.query += '&severity=' + $scope.severity;
      if ($scope.resource) $scope.query += '&resource=' + $scope.resource;
      if ($scope.event) $scope.query += '&event=' + $scope.event;
      if ($scope.group) $scope.query += '&group=' + $scope.group;
      if ($scope.services) {
        angular.forEach($scope.services.split(","), function(value, key) {
          $scope.query += '&service=' + value;
        });
      }
      if ($scope.environment) $scope.query += '&environment=' + $scope.environment;
      if ($scope.value) $scope.query += '&value=' + $scope.value;
      if ($scope.text) $scope.query += '&text=' + $scope.text;
      if ($scope.tags) {
        angular.forEach($scope.tags.split(","), function(value, key) {
          $scope.query += '&tag=' + value;
        });
      }
      // if ($scope.attributes) {
      //   angular.forEach($scope.attributes.split(","), function(value, key) {
      //     $scope.query += '&service=' + value;
      //   });
      // }
      if ($scope.apikey) $scope.query += '&api-key=' + $scope.apikey;
    }

    $scope.$watch('query', function(q) {

      console.log('trigger');

      $http.get(q).success(function(data) {
        // update the textarea
        $scope.response = data;
      });

    });

  }])

  .controller('SendController', ['$scope', function($scope) {

  }]);
