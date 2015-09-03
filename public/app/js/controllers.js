var sisclinicaControllers = angular.module('sisclinicaControllers', []);


sisclinicaControllers.controller('PacienteListCtrl', ['$scope', '$http',
  function ($scope, $http) {
  	$scope.pacientes = [{codigo:1,nome:"paulo", email:"paulo@gmail.com"},
  						{codigo:2,nome:"valeria", email:"valeria@gmail.com"},
  						{codigo:3,nome:"bruno", email:"bruno@gmail.com"}];
    /*$http.get('phones/phones.json').success(function(data) {
      $scope.phones = data;
    });

    $scope.orderProp = 'age';*/
  }]);

sisclinicaControllers.controller('ProntuarioCtrl', ['$scope', '$routeParams', '$http',
  function ($scope, $routeParams, $http) {
  	$scope.pacienteId = $routeParams.paciente_id
    /*$http.get('phones/phones.json').success(function(data) {
      $scope.phones = data;
    });

    $scope.orderProp = 'age';*/
  }]);