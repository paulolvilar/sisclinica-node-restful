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
  template : 

 '<div class="modal fade" id="avisoModal" tabindex="-1" role="dialog" aria-labelledby="avisoModalLabel">'
 +'<div class="modal-dialog" role="document">'
  +'<div class="modal-content">'
   +'<div class="modal-header">'
    +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
    +'<h4 class="modal-title" id="avisoModalLabel">Aviso</h4>'
   +'</div>'
   +'<div class="modal-body">'+
    '<div class="flash-inner span4 offset4 alert alert-success" data-ng-repeat="msg in successMsg">{{msg}}</div>'
   +'</div>'
   +'<div class="modal-footer">'
    +'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
   +'</div></div></div></div>',

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
  //console.log($rootScope.successMsg)
  $('#avisoModal').modal('show').on('hidden.bs.modal', function (e) {
    $rootScope.successMsg.splice(0);
  })
  
 }
   }
  };
 }
);

sisclinicaApp.directive('textarea', function() {
    return {
        restrict: 'E',
        link: function( scope , element , attributes ) {
            var threshold    = 35,
                minHeight    = element[0].offsetHeight,
                paddingLeft  = element.css('paddingLeft'),
                paddingRight = element.css('paddingRight');

            var $shadow = angular.element('<div></div>').css({
                position:   'absolute',
                top:        -10000,
                left:       -10000,
                width:      element[0].offsetWidth - parseInt(paddingLeft || 0) - parseInt(paddingRight || 0),
                fontSize:   element.css('fontSize'),
                fontFamily: element.css('fontFamily'),
                lineHeight: element.css('lineHeight'),
                resize:     'none'
            });

            angular.element( document.body ).append( $shadow );

            var update = function() {
                var times = function(string, number) {
                    for (var i = 0, r = ''; i < number; i++) {
                        r += string;
                    }
                    return r;
                }

                var val = element.val().replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/&/g, '&amp;')
                    .replace(/\n$/, '<br/>&nbsp;')
                    .replace(/\n/g, '<br/>')
                    .replace(/\s{2,}/g, function( space ) {
                        return times('&nbsp;', space.length - 1) + ' ';
                    });

                $shadow.html( val );

                element.css( 'height' , Math.max( $shadow[0].offsetHeight + threshold , minHeight ) );
            }

            scope.$on('$destroy', function() {
                $shadow.remove();
            });

            element.bind( 'keyup keydown keypress change ' , update );

            setTimeout(function() { update(); }, 500);
        }
    }
});