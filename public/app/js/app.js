var sisclinicaApp = angular.module('sisclinicaApp', [
  'ngRoute',
  'sisclinicaControllers'
]);
sisclinicaApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/pacientes', {
        templateUrl: 'app/partials/pacientes.html',
        controller: 'PacienteListCtrl'
      }).
      when('/pacientes/:paciente_id/prontuario', {
        templateUrl: 'app/partials/prontuario.html',
        controller: 'ProntuarioCtrl'
      }).
      when('/home', {
        templateUrl: 'app/partials/home.html',
      }).otherwise({
        redirectTo: '/home'
      });
  }]);