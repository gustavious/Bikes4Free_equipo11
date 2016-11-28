'use strict';

angular.module('bikeApp.puntos', ['ngRoute', 'uiGmapgoogle-maps']).config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/puntos', {
        templateUrl: 'js/angular/modulos/puntos/puntos.tpl.html',
        controller: 'PuntosController'
    });
}])
    .controller('PuntosController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', 'puntosSvc', 'uiGmapGoogleMapApi',  function($scope, $rootScope, $http, $location, $routeParams, puntosSvc, uiGmapGoogleMapApi){

        $scope.puntoActual = {};
        $scope.puntoNuevo = {};
        $scope.showTable = true;
        $scope.showCreate = false;
        $scope.showUpdate = false;
        $scope.hayError = false;
        $scope.error1;
        $scope.markers = [];
        $scope.map = { center: { latitude: 4.6569221, longitude: -74.0965247 }, zoom: 12 };
        $scope.clickEnMarker = false;
        $scope.infoMarker = {};

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
                $scope.puntosRetorno = response.data;
                for(var i = 0; i<$scope.puntosRetorno.length;i++)
                {
                    $scope.puntoMarkerActual = $scope.puntosRetorno[i];
                    var ret = {
                        latitude: $scope.puntoMarkerActual.latitud,
                        longitude: $scope.puntoMarkerActual.longitud,
                        title: $scope.puntoMarkerActual.nombre,
                        id: $scope.puntoMarkerActual.id
                    }
                    $scope.markers.push(ret);    
                }
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
        
        //REPORTE
        $scope.report = function(){
            puntosSvc.retrieve().then(function successCallback(response) {
                var d = response.data;
                var csvContent = "data:text/csv;charset=ISO-8859-1,";

                d.forEach(function(infoArray, index){
                    if(index == 0){
                        var inf = [];
                        inf.push(" ")
                        inf.push("Nombre");
                        inf.push("Latitud");
                        inf.push("Longitud");
                        var dataString = Array.prototype.join.call(inf, ",");
                        csvContent += index < d.length ? dataString+ "\n" : dataString;
                    }
                    var inf = [];
                    inf.push(index)
                    inf.push(infoArray.nombre);
                    inf.push(infoArray.latitud);
                    inf.push(infoArray.longitud);
                    var dataString = Array.prototype.join.call(inf, ",");
                    csvContent += index < d.length ? dataString+ "\n" : dataString;
                });

                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "puntos_atencion.csv");
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
            $scope.puntoActual = item;
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
        
        $scope.markerClick = function(marker, eventName, model){
            $scope.clickEnMarker = true;
            $scope.infoMarker.id = model.id;
            $scope.infoMarker.latitud = model.latitude;
            $scope.infoMarker.longitud = model.longitude;
            $scope.infoMarker.nombre = model.title;
            $scope.infoMarker.modelo = model;
            $scope.infoMarker.options = {
            pixelOffset: {width:-1,height:-20}
            }
            
        }
        
        $scope.cerrarVentana = function(){
            $scope.clickEnMarker = false;
        }

    }]);