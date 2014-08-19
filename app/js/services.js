'use strict';

/* Services */

angular.module('explorer.services', ['ngResource'])

.factory('Alert', ['$resource',
  function($resource) {
    var endpoint = 'http://api.alerta.io';
    return $resource(endpoint+'/api/alert/:id', {}, {
      'query':  {method:'GET', url: endpoint+'/api/alerts'},
      'save':   {method:'POST'},
      'get':    {method:'GET'},
      'status': {method:'POST', url: endpoint+'/api/alert/:id/status'},
      'remove': {method:'DELETE'},
      'delete': {method:'DELETE'},
      'tag':    {method:'POST', url: endpoint+'/api/alert/:id/tag'},
      'untag':  {method:'POST', url: endpoint+'/api/alert/:id/untag'},
      'top10':  {method:'GET', url: endpoint+'/api/alerts/top10'}
    });
  }]);