var sisclinicaControllers = angular.module('sisclinicaControllers', []);


sisclinicaControllers.controller('PacienteListCtrl', ['$scope', 'PacientesModel',
  function ($scope, PacientesModel) {
    $scope.pacientes=PacientesModel.query()
  	/*PacientesModel.all()
    .then(function (result) {
      $scope.pacientes = result.data;
    });
    $http.get('phones/phones.json').success(function(data) {
      $scope.phones = data;
    });

    $scope.orderProp = 'age';*/
  }]);

sisclinicaControllers.controller('ProntuarioCtrl', ['$scope', '$routeParams', 
  function ($scope, $routeParams) {
  	$scope.pacienteId = $routeParams.paciente_id
    /*$http.get('phones/phones.json').success(function(data) {
      $scope.phones = data;
    });

    $scope.orderProp = 'age';*/
  }]);


sisclinicaControllers.controller('PacienteCtrl', ['$scope', '$routeParams', 'PacientesModel',
  function ($scope, $routeParams, PacientesModel) {
    if($routeParams.paciente_id){
      $scope.paciente_id=$routeParams.paciente_id
      $scope.paciente=PacientesModel.get({_id:$scope.paciente_id},function(){console.log($scope.paciente)})
    }else{
      $scope.paciente=new PacientesModel()
    }
    $scope.teste=function(){
      PacientesModel.save($scope.paciente,function(){console.log('paciente salvo')})
    }  
  }]);


  