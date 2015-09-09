var sisclinicaControllers = angular.module('sisclinicaControllers', []);


sisclinicaControllers.controller('PacienteListCtrl', ['$scope', 'PacientesModel',
  function ($scope, PacientesModel) {
    $scope.pacientes=[]
    $scope.get=function(){
      $scope.pacientes=PacientesModel.query({nome__regex:"/"+$scope.nomePaciente+"+/i"})
    }
  }]);


function padDigits(number, digits) {return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;}

sisclinicaControllers.controller('ProntuarioCtrl', ['$rootScope','$scope', '$routeParams', 'PacientesModel',
  function ($rootScope, $scope, $routeParams, PacientesModel) {
    if($routeParams.paciente_id){
      $scope.paciente_id=$routeParams.paciente_id
      $scope.paciente=PacientesModel.get({_id:$scope.paciente_id})
          
      var now = new Date()
      var snow = padDigits(now.getDate(),2)+"/"+padDigits(now.getMonth()+1,2)+"/"+padDigits(now.getFullYear(),4)
      $scope.evoData=snow
    }else{
      $rootScope.successMsg.push('erro')
    }
    $scope.teste=function(){
      if($scope.paciente._id){
        if($scope.evoTexto){
          if(!$scope.paciente.prontuario.evolucao){
            $scope.paciente.prontuario.evolucao=[]
          }
          var evolucao = {}
          evolucao.data=$scope.evoData
          evolucao.texto=$scope.evoTexto
          $scope.paciente.prontuario.evolucao.push(evolucao)
          $scope.evoTexto=null;          
        }
        $scope.paciente.$update(function(){$scope.paciente=PacientesModel.get({_id:$scope.paciente_id}); $rootScope.successMsg.push('prontuario atualizado com sucesso')})
      }else{
        $rootScope.successMsg.push('erro')  
      }
      
    }  
  }]);


sisclinicaControllers.controller('PacienteCtrl', ['$rootScope','$scope', '$routeParams', 'PacientesModel',
  function ($rootScope, $scope, $routeParams, PacientesModel) {
    if($routeParams.paciente_id){
      $scope.paciente_id=$routeParams.paciente_id
      $scope.paciente=PacientesModel.get({_id:$scope.paciente_id})
    }else{
      $scope.paciente=new PacientesModel()
    }
    $scope.excluir=function(){
      if($scope.paciente._id){
        $scope.paciente.$delete(function(){$rootScope.successMsg.push('paciente excluido com sucesso')})
      }
    }
    $scope.teste=function(){
      if($scope.paciente._id){
        $scope.paciente.$update(function(){$scope.paciente=PacientesModel.get({_id:$scope.paciente_id}); $rootScope.successMsg.push('paciente atualizado com sucesso')})
      }else{
        PacientesModel.save($scope.paciente,function(){$rootScope.successMsg.push('paciente inserido com sucesso')})  
        
      }
      
    }  
  }]);


  