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


sisclinicaApp.run(function($rootScope) {
    $rootScope.successMsg = [];
})

sisclinicaApp.directive('spFlash',
function() {
 return {
  restrict : 'A',
  replace : true,
  template : '<div class="flash row-fluid">'
 
 + '<div class="flash-inner span4 offset4 alert alert-success" data-ng-repeat="msg in successMsg">{{msg}}</div>'
 
 + '</div>',

 // If you are using twitter bootsrtap along with angular
 //then you can use this classes span4 ,offset4 ,alert etc 
 //or you can define your own css for better look an feel.
 
 link : function($rootScope, scope, element, attrs) {
  $rootScope.$watch('successMsg', function(val) {
   if (val.length) {
    update();
   }
  }, true);
   
 function update() {
  $('.flash')
   .fadeIn(500).delay(3000)
   .fadeOut(500, function() {
   $rootScope.successMsg.splice(0);
  });
 }
   }
  };
 }
);