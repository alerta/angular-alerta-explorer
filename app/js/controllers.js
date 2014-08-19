'use strict';

/* Controllers */

angular.module('explorer.controllers', [])

  .controller('QueryController', ['$scope', '$http', function($scope, $http) {

    $scope.resource = '';
    $scope.event = '';
    $scope.environment = '';

    $scope.severity = '';
    $scope.status = 'open';
    $scope.correlate = '';
    $scope.services = '';

    $scope.group = '';
    $scope.value = '';
    $scope.text = '';
    $scope.tags = '';

    $scope.attributes = '';
    $scope.origin = '';
    $scope.type = '';

    $scope.apikey = 'demo-key';

    $scope.alertid = '';
    $scope.fromdate = '';
    $scope.limit = 10;
    $scope.repeat = '';

    $scope.query = 'http://api.alerta.io/api/alerts?api-key=' + $scope.apikey;

    $scope.update = function() {

      $scope.query = 'http://api.alerta.io/api/alerts?';

      if ($scope.resource) $scope.query += '&resource=' + $scope.resource;
      if ($scope.event) $scope.query += '&event=' + $scope.event;
      if ($scope.environment) $scope.query += '&environment=' + $scope.environment;

      if ($scope.severity) $scope.query += '&severity=' + $scope.severity;
      if ($scope.status) $scope.query += '&status=' + $scope.status;
      if ($scope.correlate) $scope.query += '&correlate=' + $scope.correlate;

      if ($scope.services) {
        angular.forEach($scope.services.split(","), function(value, key) {
          $scope.query += '&service=' + value;
        });
      }

      if ($scope.group) $scope.query += '&group=' + $scope.group;
      if ($scope.value) $scope.query += '&value=' + $scope.value;
      if ($scope.text) $scope.query += '&text=~' + $scope.text;

      if ($scope.tags) {
        angular.forEach($scope.tags.split(","), function(value, key) {
          $scope.query += '&tag=' + value;
        });
      }

      if ($scope.attributes) {
        angular.forEach($scope.attributes.split(","), function(value, key) {
          var arr = value.split("=");
          arr[1] && ($scope.query += '&attributes.' + arr[0] + '=' + arr[1]);
        });
      }

      if ($scope.origin) $scope.query += '&origin=' + $scope.origin;
      if ($scope.type) $scope.query += '&type=' + $scope.type;
      if ($scope.apikey) $scope.query += '&api-key=' + $scope.apikey;

      if ($scope.alertid) $scope.query += '&id=' + $scope.alertid;
      if ($scope.fromdate) $scope.query += '&from-date=' + $scope.fromdate;
      if ($scope.limit) $scope.query += '&limit=' + $scope.limit;
      if ($scope.repeat) $scope.query += '&repeat=' + $scope.repeat;

    };

    $scope.$watch('query', function(q) {

      console.log('trigger');

      $http.get(q).success(function(data) {
        // update the textarea
        $scope.response = data;
      });

    });

  }])

  .controller('SendController', ['$scope', '$http', 'Alert', function($scope, $http, Alert) {

    $scope.resource = '';
    $scope.event = '';
    $scope.environment = '';

    $scope.severity = 'normal';
    $scope.status = 'open';
    $scope.correlate = '';
    $scope.services = '';

    $scope.group = '';
    $scope.value = '';
    $scope.text = '';
    $scope.tags = '';

    $scope.attributes = '';
    $scope.origin = navigator.userAgent;
    $scope.type = 'browserAlert';

    $scope.apikey = 'demo-key';

    $scope.post = 'http://api.alerta.io/api/alert?api-key=' + $scope.apikey;

    $scope.update = function() {

      var attrs = {};
      angular.forEach($scope.attributes.split(","), function(value, key) {
        var arr = value.split("=");
        arr[1] && (attrs[arr[0]] = arr[1]);
      });

      $scope.alert = {
        "resource": $scope.resource,
        "event": $scope.event,
        "environment": $scope.environment,
        "severity": $scope.severity,
        "status": $scope.status,
        "correlate": $scope.correlate.split(","),  // dont add if empty
        "service": $scope.services.split(","),
        "group": $scope.group,
        "value": $scope.value,
        "text": $scope.text,
        "tags": $scope.tags.split(","),  // dont add if empty
        "attributes": attrs,  // dont add if empty
        "origin": $scope.origin,
        "type": $scope.type
      };

      $scope.post = 'http://api.alerta.io/api/alert?api-key=' + $scope.apikey;
    };

    $scope.send = function() {

      console.log('send');

      $http.defaults.headers.common.Authorization = 'Key ' + $scope.apikey;

      Alert.save({}, $scope.alert, function(data) {
        $scope.response = data;
      });
    };

  }]);
