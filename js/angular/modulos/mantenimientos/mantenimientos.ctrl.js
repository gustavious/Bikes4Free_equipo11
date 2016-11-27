'use strict';

angular.module('bikeApp.mantenimientos', ['ngRoute']).config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/mantenimientos', {
        templateUrl: 'js/angular/modulos/mantenimientos/mantenimientos.tpl.html',
        controller: 'MantenimientosController'
    });
}])
    .controller('MantenimientosController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', 'mantenimientosSvc', function($scope, $rootScope, $http, $location, $routeParams, mantenimientosSvc){

        $scope.estados = [
            {nombre: "En curso", value: "EN_CURSO"},
            {nombre: "Finalizado", value: "FINALIZADO"}
        ];
        
        $scope.tipos = [
            {nombre: "Daño", value: "DAÑO"},
            {nombre: "Violación", value: "VIOLACION"},
            {nombre: "Irregularidad", value:"IRREGULARIDAD"}
        ]
        
        $scope.selectedTipo = {};
        $scope.selectedEstado = {};
        $scope.mantenimientoActual = {};
        $scope.mantenimientoNuevo = {};
        $scope.showTable = true;
        $scope.showCreate = false;
        $scope.showUpdate = false;
        $scope.hayError = false;
        $scope.error1;

        //CREATE
        $scope.create = function(){
            var json = {};

            json.id_bici = $scope.mantenimientoNuevo.id_bici;
            json.descripcion = $scope.mantenimientoNuevo.descripcion;
            json.tipo = $scope.mantenimientoNuevo.tipo;

            if(json !== {}){
                mantenimientosSvc.create(json).then(function successCallback(response) {
                    $scope.retrieve();
                    $scope.showTable = true;
                    $scope.showCreate = false;
                    $scope.showUpdate = false;
                    $scope.mantenimientoNuevo = {};
                }, function errorCallback(response) {
                    console.log('error');
                    $scope.mantenimientoNuevo = {};
                    $scope.hayError=true;
                    $scope.error1 = response.data.error;
                });
            }
        };


        //RETRIEVE
        $scope.retrieve = function(){
            mantenimientosSvc.retrieve().then(function successCallback(response) {
                $scope.items = response.data;
            }, function errorCallback(response) {
                console.log('error');
                $scope.hayError=true;
                $scope.error1 = response.data.error;
            });
        };
        $scope.retrieve();


        //UPDATE
        $scope.update = function(){
            var json = {};

            json.id_bici = $scope.mantenimientoNuevo.id_bici;
            json.descripcion = $scope.mantenimientoNuevo.descripcion;
            json.tipo = $scope.mantenimientoNuevo.tipo;

            if(json !== {}){
                mantenimientosSvc.update(json).then(function successCallback(response) {
                    $scope.retrieve();
                    $scope.showTable = true;
                    $scope.showCreate = false;
                    $scope.showUpdate = false;
                }, function errorCallback(response) {
                    console.log('error');
                });
            }
        };


        //DELETE
        $scope.delete = function( id ){

            var con = confirm("Está seguro de que quiere eliminar la solicitud de mantenimiento con id: " + id + "?");

            if( con == true ){
                mantenimientosSvc.delete(id).then(function successCallback(response) {
                    $scope.retrieve();       
                }, function errorCallback(response) {
                    console.log('error');
                    $scope.hayError=true;
                    $scope.error1 = response.data.error;
                });
            }
        };
        
        //REPORTE
        $scope.report = function(){
            mantenimientosSvc.retrieve().then(function successCallback(response) {
                var d = response.data;
                var csvContent = "data:text/csv;charset=ISO-8859-1,";

                d.forEach(function(infoArray, index){
                    if(index == 0){
                        var inf = [];
                        inf.push(" ")
                        inf.push("ID");
                        inf.push("Nombre");
                        inf.push("Descripción");
                        var dataString = Array.prototype.join.call(inf, ",");
                        csvContent += index < d.length ? dataString+ "\n" : dataString;
                    }
                    var inf = [];
                    inf.push(index)
                    inf.push(infoArray.id);
                    inf.push(infoArray.nombre);
                    inf.push(infoArray.descripcion);
                    var dataString = Array.prototype.join.call(inf, ",");
                    csvContent += index < d.length ? dataString+ "\n" : dataString;
                });

                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "solicitudes_mantenimiento.csv");
                document.getElementById("acciones").appendChild(link);
                link.click();

            }, function errorCallback(response) {
                console.log('error');
                $scope.hayError=true;
                $scope.error1 = response.data.error;
            });
        }


        //Editar
        $scope.edit = function( item ){
            $scope.showTable = false;
            $scope.showCreate = false;
            $scope.showUpdate = true;
            $scope.mantenimientoActual = item;
        };


        //Nuevo
        $scope.new = function( item ){
            $scope.showTable = false;
            $scope.showCreate = true;
            $scope.showUpdate = false;
            $scope.mantenimientoNuevo = {};
        };


        //Cancelar
        $scope.cancel = function( item ){
            $scope.showTable = true;
            $scope.showCreate = false;
            $scope.showUpdate = false;
            $scope.mantenimientoNuevo = {};
        };
        
         $scope.cerrarError = function(  ){
            
            $scope.hayError = !$scope.hayError;
            $scope.submitted=false;
            
           
        };

        $scope.darError = function(  ){
            return $scope.hayError;
        };


    }]);