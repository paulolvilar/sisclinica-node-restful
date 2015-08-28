var sisclinicaApp = angular.module('sisclinicaApp', [
  'ngRoute',
  'sisclinicaControllers'
]);
sisclinicaApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/pacientes', {
        templateUrl: 'app/partials/home.html',
        controller: 'PacienteListCtrl'
      }).
      when('/home', {
        templateUrl: 'app/partials/home.html',
      }).otherwise({
        redirectTo: '/home'
      });
  }]);