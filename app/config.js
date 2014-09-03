'use strict';

angular.module('config', [])
  .constant('config', {
    'endpoint'    : "http://"+window.location.hostname+":8080"
  });
