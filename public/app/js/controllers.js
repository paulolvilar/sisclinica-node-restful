var sisclinicaControllers = angular.module('sisclinicaControllers', ['ngFileUpload']);


sisclinicaControllers.controller('PacienteListCtrl', ['$scope', '$rootScope', 'PacientesModel',
  function ($scope, $rootScope, PacientesModel) {
    $scope.pacientes=[]
    $scope.nomePaciente = $rootScope.nomePaciente
    $scope.get=function(){
      $rootScope.nomePaciente = $scope.nomePaciente
      $scope.pacientes=PacientesModel.query({nome__regex:"/"+$scope.nomePaciente+"+/i"})
    }
    if($scope.nomePaciente) $scope.get()
    
  }]);


function padDigits(number, digits) {return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;}

sisclinicaControllers.controller('ProntuarioCtrl', ['$http','$rootScope','$scope', '$routeParams', 'PacientesModel', 'ImagensModel','Upload', '$timeout',
  function ($http, $rootScope, $scope, $routeParams, PacientesModel, ImagensModel, Upload, $timeout) {
    $scope.imagens=[]
    if($routeParams.paciente_id){
      $scope.paciente_id= $routeParams.paciente_id
      $scope.paciente= PacientesModel.get({_id:$scope.paciente_id})
      $scope.imagens = ImagensModel.query({paciente_id:$scope.paciente_id})

      var now = new Date()
      $scope.snow = padDigits(now.getDate(),2)+"/"+padDigits(now.getMonth()+1,2)+"/"+padDigits(now.getFullYear(),4)
      $scope.evoData=$scope.snow
    }else{
      $rootScope.successMsg.push('erro')
    }

    $scope.uploadFiles = function(file) {
        $scope.f = file;
        if (file && !file.$error) {
            file.upload = Upload.upload({
                url: '/createpost',
                file: file,
                fields:{pacienteid:$scope.paciente_id}
            });

            file.upload.progress(function(evt) {
              file.progress = Math.min(100, parseInt(100.0 * 
                                                       evt.loaded / evt.total));
            }).success(function(data, status, headers, config) {
              // file is uploaded successfully
              var imagem = new ImagensModel()
              imagem.filename = $scope.paciente_id+file.name
              imagem.date = $scope.snow
              imagem.paciente_id = $scope.paciente_id
              ImagensModel.save(imagem, function(){console.log('salvou')})
              $scope.imagens.push(imagem);
            }).error(function(data, status, headers, config) {
              // handle error
              $scope.errorMsg = status + ': ' + data;
            })
        }
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
        if(!$scope.paciente.prontuario.dataAdmissao) $scope.paciente.prontuario.dataAdmissao = $scope.snow
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
        PacientesModel.save($scope.paciente,function(data){
          $scope.paciente=data
          $scope.paciente_id = $scope.paciente._id
          $rootScope.nomePaciente =  $scope.paciente.nome
          $rootScope.successMsg.push('paciente inserido com sucesso')}
        )  
        
      }
      
    }  
  }]);


  