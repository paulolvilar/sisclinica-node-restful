var sisclinicaServices = angular.module('sisclinicaServices',['ngResource'])

sisclinicaServices.factory('PacientesModel', function($resource) {
  return $resource('/api/pacientes/:_id'); // Note the full endpoint address
 });