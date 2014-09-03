'use strict';

/* Services */

angular.module('explorer.services', ['config', 'ngResource'])

.factory('Alert', ['$resource', 'config',
  function($resource, config) {
    return $resource(config.endpoint+'/api/alert/:id', {}, {
      'query':  {method:'GET', url: config.endpoint+'/api/alerts'},
      'save':   {method:'POST'},
      'get':    {method:'GET'}
    });
  }]);