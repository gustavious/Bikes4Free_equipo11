'use strict';

angular.module('bikeApp.form', ['ngRoute']).config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/:entidad/form', {
        templateUrl: 'js/angular/modulos/components/form.tpl.html',
        controller: 'FormController'
    });
}])
    .controller('FormController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', function($scope, $rootScope, $http, $location, $routeParams){

        var entidad = $routeParams.entidad;    
        $scope.entidad = $routeParams.entidad;

        var dic = [
            ["valor", "descripcion"], //Campos de multa
            ["latitud", "longitud"], //Campos de puntos
            ["descripcion"], //Campos de tipos
            ["username", "email", "first_name", "last_name", "groups"] //Campos de usuarios
        ]

        if(entidad === 'multas'){
            $scope.cols = dic[0];
        }
        else if(entidad === 'puntos'){
            $scope.cols = dic[1];
        }
        else if(entidad === 'tipos'){
            $scope.cols = dic[2];
        }
        else if(entidad === 'usuarios'){
            $scope.cols = dic[3];
        }
        else{
            $location.path('/');
        }
        
        $scope.salvar = function(){
            var json = {};
            for( var i = 0; i < $scope.cols.length; i++ ){
                var propiedad = $scope.cols[i];
                var valor = document.getElementById($scope.cols[i]).value;
                var prop = propiedad.slice(0,propiedad.length);
                if(prop === "groups"){
                    var g = [];
                    g.push(parseInt(valor));
                    json[prop] = g;
                }
                else{
                    json[prop] = valor;
                }
                
            }
            if(json !== {}){
                $http({
                    method: 'POST',
                    url: 'http://b4f.herokuapp.com/' + entidad + '/',
                    contentType: "application/json",
                    data: json
                }).then(function successCallback(response) {
                    $location.path('/' + entidad + '/tabla');       
                }, function errorCallback(response) {
                    console.log('error');
                    $location.path('/' + entidad + '/tabla');
                });
            }
        }
    }]);