'use strict';

angular.module('bikeApp.reservasUser', ['ngRoute', 'bikeApp', 'bikeApp.usuarios']).config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/reservas/user', {
        templateUrl: 'js/angular/modulos/reservas_user/reservas_user.tpl.html',
        controller: 'ReservasUserController'
    })
    
    .when('/reportes/user', {
        templateUrl: 'js/angular/modulos/reservas_user/reportes_user.tpl.html',
        controller: 'ReservasUserController'
    })
    
    .when('/calificar/user', {
        templateUrl: 'js/angular/modulos/reservas_user/calificar_user.tpl.html',
        controller: 'ReservasUserController'
    })
    
        .when('/reservar', {
        templateUrl: 'js/angular/modulos/reservas_user/reservar.tpl.html',
        controller: 'ReservasUserController'
    });
    
    
}])
    .controller('ReservasUserController', ['$scope', 'filterFilter', '$rootScope', '$http', '$location', '$routeParams', 'reservasUserSvc', 'usuariosSvc', 'authSvc', function($scope, filterFilter, $rootScope, $http, $location, $routeParams, reservasUserSvc, usuariosSvc, authSvc){

        $scope.reservaActual = {};
        $scope.reservaNueva = {};
        $scope.puntoActual = {};
        $scope.selectedTipo = {};
        $scope.showTable = true;
        $scope.showCreate = false;
        $scope.showUpdate = false;
        $scope.invalido = false;
        $scope.hayError = false;
        $scope.error1;
        $scope.idActual;
        $scope.submitted=false;
        $scope.duracion;
        $scope.frecuente;
        $scope.calificar = false;
        $scope.notaActual = 0;


        //Cargar reservas del usuario
        $scope.retrieve = function()
        {
            //TODO Poner id del usuario aquí
            var id_usuario = authSvc.getId();
            console.log( authSvc.getId() );
            $scope.hayError = false;
            reservasUserSvc.retrieve( id_usuario ).then(function successCallback(response) {
                $scope.items = response.data;
            }, function errorCallback(response) {
                console.log(response);
                console.log('error');
                $scope.hayError=true;
                $scope.error1 = response.data.error;
                //TODO Mostrar mensaje de error al usuario
            });
        };
        
        //TODO Descomentar cuando ya se tenga disponible el id del usuario
       $scope.retrieve();
        
        //Cargar reservas del usuario
        $scope.darReportes = function()
        {
            //TODO Poner id del usuario aquí
            var id_usuario = authSvc.getId();
            $scope.hayError = false;
            reservasUserSvc.getReportes( id_usuario )
                .then(function successCallback(response) {
                $scope.lista = response.data;
                }, 
                
                function errorCallback(response) {
                console.log(response);
                console.log('error');
                $scope.hayError=true;
                $scope.error1 = response.data.error;
                //TODO Mostrar mensaje de error al usuario
            });
        };
        
        $scope.darReportes();
        
        //Cargar puntos y tipos de bicicleta
        $scope.cargar = function()
        {
            //Get puntos
            $scope.hayError = false;
            reservasUserSvc.getPuntos().then(function successCallback(response) {
                $scope.puntos = response.data;
                console.log(response.data);
            }, function errorCallback(response) {
                console.log(response);
                console.log('error');
                $scope.hayError=true;
                $scope.error1 = response.data.error;
                //TODO Mostrar mensaje de error al usuario
            });
            
            //Get tipos de bicicleta
            reservasUserSvc.getTipos().then(function successCallback(response) {
                $scope.tipos = response.data;
            }, function errorCallback(response) {
                console.log(response);
                console.log('error');
                $scope.hayError=true;
                $scope.error1 = response.data.error;
                //TODO Mostrar mensaje de error al usuario
            });
        };
        $scope.cargar();

        
        //Crear Reserva
        $scope.create = function( item ){
            
            var json = {};
            //TODO Hacer validaciones y formar el JSON

            json.id_punto = $scope.puntoActual.id;
            console.log($scope.puntoActual.id);
            json.id_tipo_bici = $scope.selectedTipo.obj.id;
            console.log($scope.selectedTipo.obj.id);
            
            var fecha = $scope.reservaNueva.fecha;
            var fechaMS = fecha.getTime();
            console.log(fechaMS);
            json.fecha = fechaMS;
            $scope.submitted=true;
                        
            if($scope.reservaNueva.autorizado != "" && $scope.reservaNueva.autorizado != undefined){
                json.autorizado = $scope.reservaNueva.autorizado;
            }

            //TODO Poner aquí el ID de usuario
            var id_usuario = authSvc.getId();
            console.log(authSvc.getId());

            console.log(json);
            
            if(json !== {}){
                reservasUserSvc.create(id_usuario, json).then(function successCallback(response) {
                    $scope.retrieve();
                    $scope.showTable = true;
                    $scope.showCreate = false;
                    $scope.showUpdate = false;
                    $scope.puntoActual = {};
                    $scope.fecha = "";
                    $scope.selectedTipo = {};
                }, function errorCallback(response) {
                    console.log('error');
                    $scope.hayError=true;
                    $scope.error1 = response.data.error;
                  
                    //TODO Mostrar mensaje de error al usuario
                });
            }
        };

        //UPDATE
        $scope.update = function(){
            var json = {};
            //TODO Hacer validaciones y formar el JSON

            json.id = $scope.reservaActual.id;
            json.nombre = $scope.reservaActual.nombre;
            json.descripcion = $scope.reservaActual.descripcion;
            json.valor = $scope.reservaActual.valor;

            if(json !== {}){
                reservasUserSvc.update(json).then(function successCallback(response) {
                    $scope.retrieve();
                    $scope.showTable = true;
                    $scope.showCreate = false;
                    $scope.showUpdate = false;
                }, function errorCallback(response) {
                    console.log('error');
                    $scope.hayError=true;
                    $scope.error1 = response.data.error;
                    //TODO Mostrar mensaje de error al usuario
                });
            }
        };


        //Reservar
        $scope.reservar = function( item ){
            $scope.showTable = false;
            $scope.showCreateReservar = true;
            $scope.puntoActual = item;
        };


        //Nuevo
        $scope.new = function( item ){
            $scope.showTable = false;
            $scope.showCreate = true;
            $scope.showUpdate = false;
            $scope.reservaNueva = {};
        };


        //Cancelar
        $scope.cancel = function( item ){
            $scope.showTable = true;
            $scope.showCreate = false;
            $scope.showUpdate = false;
            $scope.showCreateReservar = false;
            $scope.puntoActual = {};
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
            
            $scope.hayError = !$scope.hayError;
            $scope.submitted=false;
            
           
        };

        $scope.darError = function(  ){
            return $scope.hayError;
        };

        $scope.calificar = function ( ){
            $scope.calificar = !$scope.calificar;
         };  
        
        $scope.calificarPunto = function ( ){
            $window.localStorage['notaPunto'] = $scope.notaActual; 
           
        };
    }]);