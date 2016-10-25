'use strict';

angular.module('bikeApp.puntos', ['ngRoute']).config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/puntos', {
        templateUrl: 'js/angular/modulos/puntos/puntos.tpl.html',
        controller: 'PuntosController'
    });
}])
    .controller('PuntosController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', 'puntosSvc', function($scope, $rootScope, $http, $location, $routeParams, puntosSvc){

        $scope.puntoActual = {};
        $scope.puntoNuevo = {};
        $scope.showTable = true;
        $scope.showCreate = false;
        $scope.showUpdate = false;
        $scope.hayError = false;
        $scope.error1;

        //CREATE
        $scope.create = function(){

            var json = {};
            //TODO Hacer validaciones y formar el JSON

            json.nombre = $scope.puntoNuevo.nombre;
            json.latitud = $scope.puntoNuevo.latitud;
            json.longitud = $scope.puntoNuevo.longitud;

            if(json !== {}){
                puntosSvc.create(json).then(function successCallback(response) {
                    $scope.retrieve();
                    $scope.showTable = true;
                    $scope.showCreate = false;
                    $scope.showUpdate = false;
                    $scope.puntoNuevo = {};
                }, function errorCallback(response) {
                    console.log('error');
                    $scope.puntoNuevo = {};
                    $scope.hayError = true;
                    $scope.error1 = response.data.error;
                    //TODO Mostrar mensaje de error al usuario
                });
            }
        };


        //RETRIEVE
        $scope.retrieve = function(){
            puntosSvc.retrieve().then(function successCallback(response) {
                $scope.items = response.data;
            }, function errorCallback(response) {
                console.log('error');
                $scope.hayError = true;
                $scope.error1 = response.data.error;
                //TODO Mostrar mensaje de error al usuario
            });
        };
        $scope.retrieve();


        //UPDATE
        $scope.update = function(){
            var json = {};
            //TODO Hacer validaciones y formar el JSON

            json.id = $scope.puntoActual.id;
            json.nombre = $scope.puntoActual.nombre;
            json.latitud = $scope.puntoActual.latitud;
            json.longitud = $scope.puntoActual.longitud;

            if(json !== {}){
                puntosSvc.update(json).then(function successCallback(response) {
                    $scope.retrieve();
                    $scope.showTable = true;
                    $scope.showCreate = false;
                    $scope.showUpdate = false;
                }, function errorCallback(response) {
                    console.log('error');
                    $scope.hayError = true;
                    $scope.error1 = response.data.error;
                    //TODO Mostrar mensaje de error al usuario
                });
            }
        };


        //DELETE
        $scope.delete = function( id ){

            //TODO Poner esto de la confirmación más lindo
            var con = confirm("Está seguro de que quiere eliminar el elemento con id: " + id + "?");

            if( con == true ){
                puntosSvc.delete(id).then(function successCallback(response) {
                    $scope.retrieve();       
                }, function errorCallback(response) {
                    console.log('error');
                    $scope.hayError = true;
                    $scope.error1 = response.data.error;
                    //TODO Mostrar mensaje de error al usuario
                });
            }
        };


        //Editar
        $scope.edit = function( item ){
            $scope.showTable = false;
            $scope.showCreate = false;
            $scope.showUpdate = true;
            $scope.tipo = item;
        };


        //Nuevo
        $scope.new = function( item ){
            $scope.showTable = false;
            $scope.showCreate = true;
            $scope.showUpdate = false;
            $scope.puntoNuevo = {};
        };


        //Cancelar
        $scope.cancel = function( item ){
            $scope.showTable = true;
            $scope.showCreate = false;
            $scope.showUpdate = false;
            $scope.puntoNuevo = {};
        };

        $scope.darError = function(  ){
            return $scope.hayError;
        };

        $scope.cerrarError = function(  ){
            console.log($scope.hayError);
            $scope.hayError = !$scope.hayError;
            console.log($scope.hayError);
        };

    }]);