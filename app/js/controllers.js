'use strict';

/* Controllers */

angular.module('explorer.controllers', [])

  .controller('QueryController', ['$scope', '$http', 'config', function($scope, $http, config) {

    $scope.resource = '';
    $scope.event = '';
    $scope.environment = '';

    $scope.severity = '';
    $scope.status = '';
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

    $scope.trend = '';
    $scope.previous = '';
    $scope.duplcount = '';

    $scope.query = config.endpoint + '/alerts?limit=' + $scope.limit + '&api-key=' + $scope.apikey;

    $scope.update = function() {

      $scope.query = config.endpoint + '/alerts?limit=' + $scope.limit;

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
      if ($scope.repeat) $scope.query += '&repeat=' + $scope.repeat;

      if ($scope.trend) $scope.query += '&trendIndication=' + $scope.trend;
      if ($scope.previous) $scope.query += '&previousSeverity=' + $scope.previous;
      if ($scope.duplcount) $scope.query += '&duplicateCount=' + $scope.duplcount;
    };

    $scope.$watch('query', function(q) {
      $http.get(q).
        then(function(response) {
          $scope.response = response.data;
          $scope.statusText = response.statusText + ' (' + response.status + ')';
        }, function(response) {
          $scope.response = response.data;
          $scope.statusText = response.statusText + ' (' + response.status + ')';
        });
    });

  }])

  .controller('SendController', ['$scope', '$http', 'config', function($scope, $http, config) {

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

    $scope.post = config.endpoint + '/alert?api-key=' + $scope.apikey;

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
        "correlate": $scope.correlate.split(",").filter(function(v){return v!==''}),
        "service": $scope.services.split(",").filter(function(v){return v!==''}),
        "group": $scope.group,
        "value": $scope.value,
        "text": $scope.text,
        "tags": $scope.tags.split(",").filter(function(v){return v!==''}),
        "attributes": attrs,
        "origin": $scope.origin,
        "type": $scope.type
      };

      $scope.post = config.endpoint + '/alert?api-key=' + $scope.apikey;
    };

    $scope.send = function() {

      $http.defaults.headers.common.Authorization = 'Key ' + $scope.apikey;

      $http.post($scope.post, $scope.alert).
        then(function(response) {
          $scope.response = response.data;
          $scope.statusText = response.statusText + ' (' + response.status + ')';
        }, function(response) {
          $scope.response = response.data;
          $scope.statusText = response.statusText + ' (' + response.status + ')';
        });
    };

  }]);
