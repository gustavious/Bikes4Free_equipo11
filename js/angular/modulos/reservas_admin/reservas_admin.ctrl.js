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

        //REPORTE
        $scope.report = function(){
            reservasAdminSvc.retrieve().then(function successCallback(response) {
                var d = response.data;
                var csvContent = "data:text/csv;charset=ISO-8859-1,";

                d.forEach(function(infoArray, index){
                    if(index == 0){
                        var inf = [];
                        inf.push(" ")
                        inf.push("ID");
                        inf.push("Usuario");
                        inf.push("Estado");
                        inf.push("Fecha Reserva");
                        inf.push("Fecha Entrega");
                        inf.push("Tiempo Reserva");
                        inf.push("Punto Prestamo");
                        inf.push("Punto Retorno");
                        inf.push("ID Bicicleta");
                        inf.push("Multa");
                        inf.push("Usuario Autorizado");
                        var dataString = Array.prototype.join.call(inf, ",");
                        csvContent += index < d.length ? dataString+ "\n" : dataString;
                    }
                    var inf = [];
                    inf.push(index)
                    inf.push(infoArray.id);
                    inf.push(infoArray.usuario.nombre + " " + infoArray.usuario.apellido);
                    inf.push(infoArray.estado);
                    var freserva = new Date(infoArray.fecha_reserva);
                    inf.push(freserva);
                    if( infoArray.fecha_entrega != null ){
                        var fentrega = new Date(infoArray.fecha_entrega);
                        inf.push(fentrega);
                    } else {
                        inf.push("No ha sido retornada")
                    }
                    var tiempo = Math.floor( (infoArray.tiempo / 1000) * (1/60) * (1/60)  );
                    inf.push(tiempo + " horas");
                    inf.push(infoArray.puntoPrestamo.nombre);
                    if (infoArray.puntoRetorno != null){
                        inf.push(infoArray.puntoRetorno.nombre);
                    } else {
                        inf.push("No ha sido retornada");
                    }
                    inf.push(infoArray.bici.id);
                    if (infoArray.multa != null){
                        inf.push(infoArray.multa.valor);
                    } else {
                        inf.push("0");
                    }
                    if (infoArray.autorizado != null){
                        inf.push(infoArray.autorizado.nombre + " " + infoArray.autorizado.apellido);
                    } else {
                        inf.push("Ninguno");
                    }

                    var dataString = Array.prototype.join.call(inf, ",");
                    csvContent += index < d.length ? dataString+ "\n" : dataString;
                });

                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "reservas.csv");
                document.getElementById("acciones").appendChild(link);
                link.click();

            }, function errorCallback(response) {
                console.log('error');
                $scope.hayError=true;
                $scope.error1 = response.data.error;
            });
        }


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