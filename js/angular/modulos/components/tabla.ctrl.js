'use strict';

angular.module('bikeApp.tabla', ['ngRoute']).config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/:entidad/tabla', {
        templateUrl: 'js/angular/modulos/components/tabla.tpl.html',
        controller: 'TablaController'
    });
}])
    .controller('TablaController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', function($scope, $rootScope, $http, $location, $routeParams){

        var entidad = $routeParams.entidad;    
        $scope.entidad = $routeParams.entidad;
          
        var dic = [
            ["pk", "valor", "descripcion", "acciones"], //Campos de multa
            ["pk", "latitud", "longitud", "acciones"], //Campos de puntos
            ["pk", "descripcion", "acciones"], //Campos de tipos
            ["id", "username", "email", "first_name", "last_name", "groups", "acciones"] //Campos de usuarios
        ]

        if(entidad === 'multas'){
            $scope.cols = dic[0];
            $scope.ident = "pk";
        }
        else if(entidad === 'puntos'){
            $scope.cols = dic[1];
            $scope.ident = "pk";
        }
        else if(entidad === 'tipos'){
            $scope.cols = dic[2];
            $scope.ident = "pk";
        }
        else if(entidad === 'usuarios'){
            $scope.cols = dic[3];
            $scope.ident = "id";
        }
        else{
            $location.path('/');
        }

        var retrieve = function(){
            $http({
                method: 'GET',
                url: 'http://b4f.herokuapp.com/' + entidad + '/'
            }).then(function successCallback(response) {
                $scope.items = response.data;
            }, function errorCallback(response) {
                console.log('error');
            });
        }

        retrieve();

        $scope.eliminar = function( it ){
            var id = it.id ? it.id : it.pk;
            var con = confirm("Está seguro de que quiere eliminar el elemento con id: " + id + "?");
            if( con == true ){
                $http({
                    method: 'DELETE',
                    url: 'http://b4f.herokuapp.com/' + entidad + '/' + id + '/'
                }).then(function successCallback(response) {
                    retrieve();       
                }, function errorCallback(response) {
                    console.log('error');
                });
            }
            else{

            }
        }
        
        $scope.update = function( it ){
            var id = it.id ? it.id : it.pk;
            $location.path('/' + entidad + '/update/' + id );
        }
    }]);