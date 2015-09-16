var sisclinicaServices = angular.module('sisclinicaServices',['ngResource'])

sisclinicaServices.factory('PacientesModel', function($resource) {
//  return $resource('/api/pacientes/:_id'); // Note the full endpoint address

	    return $resource('/api/pacientes/:_id', { _id: '@_id' }, {
	    update: {
	      method: 'PUT' // this method issues a PUT request
	    }
  	});

 });

sisclinicaServices.factory('ImagensModel', function($resource) {
//  return $resource('/api/pacientes/:_id'); // Note the full endpoint address

	    return $resource('/api/imagens/:_id', { _id: '@_id' }, {
	    update: {
	      method: 'PUT' // this method issues a PUT request
	    }
  	});

 });