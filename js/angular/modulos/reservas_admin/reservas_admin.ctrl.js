'use strict';

angular.module('bikeApp.reservasAdmin', ['ngRoute', 'checklist-model']).config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/reservas/admin', {
        templateUrl: 'js/angular/modulos/reservas_admin/reservas_admin.tpl.html',
        controller: 'ReservasAdminController'
    });
}])
    .filter('ms_horas', function() {
    return function(x) {
        return x/3600000;
    };
})
    .controller('ReservasAdminController', ['$scope', 'filterFilter', '$rootScope', '$http', '$location', '$routeParams', 'reservasAdminSvc', function($scope, filterFilter, $rootScope, $http, $location, $routeParams, reservasAdminSvc){

        $scope.reservaActual = {};
        $scope.selectedMultas = [];
        $scope.selectedPunto = {};
        $scope.accion = "";
        $scope.showTable = true;
        $scope.showUpdate = false;
        $scope.invalido = false;
        $scope.hayError = false;
        $scope.error1;


        //RETRIEVE
        $scope.retrieve = function()
        {
            $scope.hayError = false;
            reservasAdminSvc.retrieve().then(function successCallback(response) {
                $scope.items = response.data;
            }, function errorCallback(response) {
                console.log(response);
                console.log('error');
                $scope.hayError = true;
                $scope.error1 = response.data.error;
                //TODO Mostrar mensaje de error al usuario
            });

            //Get puntos
            reservasAdminSvc.getPuntos().then(function successCallback(response) {
                $scope.puntos = response.data;
            }, function errorCallback(response) {
                console.log(response);
                console.log('error');
                 $scope.hayError = true;
                $scope.error1 = response.data.error;
                //TODO Mostrar mensaje de error al usuario
            });

            //Get multas
            reservasAdminSvc.getMultas().then(function successCallback(response) {
                $scope.multas = response.data;
            }, function errorCallback(response) {
                console.log(response);
                console.log('error');
                 $scope.hayError = true;
                $scope.error1 = response.data;
                //TODO Mostrar mensaje de error al usuario
            });
        };
        $scope.retrieve();


        //Registrar retorno
        $scope.update = function(){
            var json = {};
            //TODO Hacer validaciones y formar el JSON

            json.accion = $scope.accion;
            json.multas = $scope.selectedMultas;

            var id_punto = $scope.selectedPunto.obj.id;
            var id_reserva = $scope.reservaActual.id;

            console.log(id_punto);
            console.log(id_reserva)

            if(json !== {}){
                reservasAdminSvc.update(id_punto, id_reserva, json).then(function successCallback(response) {
                    $scope.retrieve();
                    $scope.showTable = true;
                    $scope.showCreate = false;
                    $scope.showUpdate = false;
                    $scope.reservaActual = {};
                    $scope.selectedMultas = {};
                    $scope.selectedPunto = {};
                }, function errorCallback(response) {
                    console.log('error');
                     $scope.hayError = true;
                $scope.error1 = response.data.error;
                    //TODO Mostrar mensaje de error al usuario
                });
            }
        };


        //Registrar préstamo
        $scope.lend = function( item ){
            $scope.reservaActual = item;
            $scope.accion = "prestamo";
            var json = {};
            //TODO Hacer validaciones y formar el JSON

            json.accion = $scope.accion;
            var id_punto = $scope.reservaActual.puntoPrestamo.id;
            var id_reserva = $scope.reservaActual.id;

            console.log(json);
            console.log(id_punto);
            console.log(id_reserva);

            if(json !== {}){
                reservasAdminSvc.update(id_punto, id_reserva, json).then(function successCallback(response) {
                    //TODO Poner esto más lindo
                    alert('Al usuario ' + $scope.reservaActual.usuario.nombre + ' ' + $scope.reservaActual.usuario.apellido + ' se le prestó la bicicleta con id: ' + $scope.reservaActual.bici.id);
                    $scope.retrieve();
                    $scope.showTable = true;
                    $scope.showUpdate = false;
                    $scope.reservaActual = {};
                }, function errorCallback(response) {
                    console.log('error');
                     $scope.hayError = true;
                $scope.error1 = response.data.error;
                    //TODO Mostrar mensaje de error al usuario
                });
            }            
        };


        //Registrar retorno
        $scope.receive = function( item ){
            $scope.showTable = false;
            $scope.showUpdate = true;
            $scope.reservaActual = item;
            $scope.accion = "retorno";
        };

        //Cancelar
        $scope.cancel = function(){
            $scope.showTable = true;
            $scope.showUpdate = false;
            $scope.reservaActual = {};
            $scope.accion = "";
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

        //        $scope.algo = function(){
        //            var marcadores = []
        //            var ps = $scope.puntos;
        //            for (p in ps){
        //                console.log(p);
        //                var marker = new google.maps.Marker({
        //                    position: {lat: p.latitud, lng: p.longitud},
        //                    map: map,
        //                    animation:google.maps.Animation.DROP
        //                });
        //                google.maps.event.addListener(marker, 'click', function() { $scope.puntoRetorno = p;});
        //                marcadores.push(marker);
        //            }
        //        }

    }]);