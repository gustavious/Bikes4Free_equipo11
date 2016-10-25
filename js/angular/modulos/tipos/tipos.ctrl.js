'use strict';

angular.module('bikeApp.tipos', ['ngRoute']).config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/tipos', {
        templateUrl: 'js/angular/modulos/tipos/tipos.tpl.html',
        controller: 'TiposController'
    });
}])
    .controller('TiposController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', 'tiposSvc', function($scope, $rootScope, $http, $location, $routeParams, tiposSvc){

        $scope.tipoActual = {};
        $scope.tipoNuevo = {};
        $scope.showTable = true;
        $scope.showCreate = false;
        $scope.showUpdate = false;
        $scope.hayError = false;
        $scope.error1;

        //CREATE
        $scope.create = function(){
            var json = {};
            //TODO Hacer validaciones y formar el JSON

            json.nombre = $scope.tipoNuevo.nombre;
            json.descripcion = $scope.tipoNuevo.descripcion;

            if(json !== {}){
                tiposSvc.create(json).then(function successCallback(response) {
                    $scope.retrieve();
                    $scope.showTable = true;
                    $scope.showCreate = false;
                    $scope.showUpdate = false;
                    $scope.tipoNuevo = {};
                }, function errorCallback(response) {
                    console.log('error');
                    $scope.tipoNuevo = {};
                    $scope.hayError=true;
                    $scope.error1 = response.data.error;
                    //TODO Mostrar mensaje de error al usuario
                });
            }
        };


        //RETRIEVE
        $scope.retrieve = function(){
            tiposSvc.retrieve().then(function successCallback(response) {
                $scope.items = response.data;
            }, function errorCallback(response) {
                console.log('error');
                $scope.hayError=true;
                $scope.error1 = response.data.error;
                //TODO Mostrar mensaje de error al usuario
            });
        };
        $scope.retrieve();


        //UPDATE
        $scope.update = function(){
            var json = {};
            //TODO Hacer validaciones y formar el JSON

            json.id = $scope.tipoActual.id;
            json.nombre = $scope.tipoActual.nombre;
            json.descripcion = $scope.tipoActual.descripcion;

            if(json !== {}){
                tiposSvc.update(json).then(function successCallback(response) {
                    $scope.retrieve();
                    $scope.showTable = true;
                    $scope.showCreate = false;
                    $scope.showUpdate = false;
                }, function errorCallback(response) {
                    console.log('error');
                    //TODO Mostrar mensaje de error al usuario
                });
            }
        };


        //DELETE
        $scope.delete = function( id ){

            //TODO Poner esto de la confirmación más lindo
            var con = confirm("Está seguro de que quiere eliminar el elemento con id: " + id + "?");

            if( con == true ){
                tiposSvc.delete(id).then(function successCallback(response) {
                    $scope.retrieve();       
                }, function errorCallback(response) {
                    console.log('error');
                    $scope.hayError=true;
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
            $scope.tipoActual = item;
        };


        //Nuevo
        $scope.new = function( item ){
            $scope.showTable = false;
            $scope.showCreate = true;
            $scope.showUpdate = false;
            $scope.tipoNuevo = {};
        };


        //Cancelar
        $scope.cancel = function( item ){
            $scope.showTable = true;
            $scope.showCreate = false;
            $scope.showUpdate = false;
            $scope.tipoNuevo = {};
        };
        
         $scope.cerrarError = function(  ){
            
            $scope.hayError = !$scope.hayError;
            $scope.submitted=false;
            
           
        };

        $scope.darError = function(  ){
            return $scope.hayError;
        };


    }]);