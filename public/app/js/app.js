var sisclinicaApp = angular.module('sisclinicaApp', [
  'ngRoute',
  'sisclinicaControllers',
  'sisclinicaServices'
])



sisclinicaApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/pacientes', {
        templateUrl: 'app/partials/pacientes.html',
        controller: 'PacienteListCtrl'
      }).
      when('/pacientes/:paciente_id', {
        templateUrl: 'app/partials/paciente.html',
        controller: 'PacienteCtrl'
      }).
      when('/pacientes/:paciente_id/prontuario', {
        templateUrl: 'app/partials/prontuario.html',
        controller: 'ProntuarioCtrl'
      }).
      when('/paciente', {
        templateUrl: 'app/partials/paciente.html',
        controller: 'PacienteCtrl'
      }).
      when('/home', {
        templateUrl: 'app/partials/home.html',
      }).otherwise({
        redirectTo: '/home'
      });
  }]);