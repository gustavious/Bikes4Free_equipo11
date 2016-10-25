'use strict';

angular.module('bikeApp.multas', ['ngRoute']).config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/multas', {
            templateUrl: 'js/angular/modulos/multas/multas.tpl.html',
            controller: 'MultasController'
        });
}])
    .controller('MultasController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', 'multasSvc', function($scope, $rootScope, $http, $location, $routeParams, multasSvc){

        $scope.multaActual = {};
        $scope.multaNueva = {};
        $scope.showTable = true;
        $scope.showCreate = false;
        $scope.showUpdate = false;
        $scope.invalido = false;
        $scope.hayError = false;
        $scope.error1;

        //CREATE
        $scope.create = function(){
            var json = {};
            //TODO Hacer validaciones y formar el JSON

            json.nombre = $scope.multaNueva.nombre;
            json.descripcion = $scope.multaNueva.descripcion;
            json.valor = $scope.multaNueva.valor;

            if(json !== {}){
                multasSvc.create(json).then(function successCallback(response) {
                    $scope.retrieve();
                    $scope.showTable = true;
                    $scope.showCreate = false;
                    $scope.showUpdate = false;
                    $scope.multaNueva = {};
                }, function errorCallback(response) {
                    console.log('error');
                    $scope.multaNueva = {};
                    $scope.hayError = true;
                    $scope.error1 = response.data.error;
                    //TODO Mostrar mensaje de error al usuario
                });
            }
        };


        //RETRIEVE
        $scope.retrieve = function()
        {
            $scope.hayError = false;
            multasSvc.retrieve().then(function successCallback(response) {
                $scope.items = response.data;
            }, function errorCallback(response) {
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

            json.id = $scope.multaActual.id;
            json.nombre = $scope.multaActual.nombre;
            json.descripcion = $scope.multaActual.descripcion;
            json.valor = $scope.multaActual.valor;

            if(json !== {}){
                multasSvc.update(json).then(function successCallback(response) {
                    $scope.retrieve();
                    $scope.showTable = true;
                    $scope.showCreate = false;
                    $scope.showUpdate = false;
                }, function errorCallback(response) {
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
                multasSvc.delete(id).then(function successCallback(response) {
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
            $scope.multaActual = item;
        };


        //Nuevo
        $scope.new = function( item ){
            $scope.showTable = false;
            $scope.showCreate = true;
            $scope.showUpdate = false;
            $scope.multaNueva = {};
        };


        //Cancelar
        $scope.cancel = function( item ){
            $scope.showTable = true;
            $scope.showCreate = false;
            $scope.showUpdate = false;
            $scope.multaNueva = {};
        };

        /**
         *  Método que se encarga de validar si el form es válido.
         *  Se define que el form es válido si todos los campos han sido llenados correctamente.
         *  En caso de que esto no se cumpla el campo invalido del $Scope se volverá true.
         */
        $scope.isValid = function(  ){
            return $scope.invalido;
        };

        $scope.cerrarError = function(  ){
            console.log($scope.hayError);
            $scope.hayError = !$scope.hayError;
            console.log($scope.hayError);
        };

        $scope.darError = function(  ){
            return $scope.hayError;
        };




    }]);