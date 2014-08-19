'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('QueryController', ['$scope', '$http', function($scope, $http) {

    $scope.query = 'http://api.alerta.io/api/alerts?limit=10';

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

    $scope.fromdate = '';

    $scope.apikey = 'PF8ReeqRAsvZzoWFfPSKZo5FyUgkyePVtahvu4mM';

    $scope.update = function() {
      $scope.query = 'http://api.alerta.io/api/alerts?limit=10';
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

  .controller('SendController', ['$scope', '$http', function($scope, $http) {

    $scope.post = 'http://api.alerta.io/api/alert'

    $scope.severity = 'normal';

    $scope.resource = '';
    $scope.event = '';
    $scope.group = '';

    $scope.services = '';
    $scope.environment = '';

    $scope.value = '';
    $scope.text = '';

    $scope.tags = '';
    $scope.attributes = '';

    $scope.apikey = 'PF8ReeqRAsvZzoWFfPSKZo5FyUgkyePVtahvu4mM';


    $scope.update = function() {
      $scope.alert = {
        "severity": $scope.severity,
        "environment": $scope.environment,
        "service": $scope.services.split(","),
        "resource": $scope.resource,
        "event": $scope.event,
        "group": $scope.group,
        "value": $scope.value,
        "text": $scope.text,
        "tags": $scope.tags.split(","),
        "attributes": $scope.attributes
      };
    };

    $scope.send = function() {

      console.log('send');
      $http.defaults.headers.common.Authorization = 'Key ' + $scope.apikey;
      $http.post($scope.post, $scope.alert).success(function(data) {
        // update the textarea
        $scope.response = data;
      });
    };

  }]);
