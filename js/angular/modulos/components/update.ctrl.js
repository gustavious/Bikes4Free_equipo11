'use strict';

angular.module('bikeApp.update', ['ngRoute']).config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/:entidad/update/:id', {
        templateUrl: 'js/angular/modulos/components/update.tpl.html',
        controller: 'UpdateController'
    });
}])
    .controller('UpdateController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', function($scope, $rootScope, $http, $location, $routeParams){

        var entidad = $routeParams.entidad;    
        $scope.entidad = $routeParams.entidad;
        
        var id = $routeParams.id;
        $scope.id = $routeParams.id;

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
        
        var keys = $scope.cols;
        
        $scope.setValues = function(){
            $http({
                method: 'GET',
                url: 'http://b4f.herokuapp.com/' + entidad + '/' + id + '/'
            }).then(function successCallback(response) {
                $scope.items = response.data;
                var element = JSON.stringify($scope.items);
                var t = JSON.parse(element);
                for( var i = 0; i < keys.length; i++ ){
                    var propiedad = keys[i];
                    var valor = t[propiedad];
                    document.getElementById(propiedad).value = valor;
            }
            }, function errorCallback(response) {
                console.log('error');
            });
        }
        
        $scope.setValues();
        
        $scope.salvar = function(){
            var json = {};
            for( var i = 0; i < $scope.cols.length; i++ ){
                var propiedad = $scope.cols[i];
                var valor = document.getElementById($scope.cols[i]).value;
                var prop = propiedad.slice(0,propiedad.length);
                if(prop === "groups"){
                    var g = [];
                    g.push(valor);
                    json[prop] = g;
                }
                else{
                    json[prop] = valor;
                }
            }
            if(json !== {}){
                $http({
                    method: 'PUT',
                    url: 'http://b4f.herokuapp.com/' + entidad + '/' + id + '/',
                    contentType: "application/json",
                    data: json
                }).then(function successCallback(response) {
                    $location.path('/' + entidad + '/tabla');       
                }, function errorCallback(response) {
                    console.log('error');
                });
            }
        }
    }]);