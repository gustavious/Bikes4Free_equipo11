'use strict';

angular.module('bikeApp.usuarios', ['ngRoute', 'ngCookies']).config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/usuarios', {
        templateUrl: 'js/angular/modulos/usuarios/usuarios.tpl.html',
        controller: 'UsuariosController'
    }).when('/login', {
        templateUrl: 'js/angular/modulos/usuarios/login.tpl.html',
        controller: 'UsuariosController'
    }).when('/register', {
        templateUrl: 'js/angular/modulos/usuarios/register.tpl.html',
        controller: 'UsuariosController'
    }).otherwise({
            redirectTo:'/login'
        });
}])
 .constant('BACKEND', 'http://b4f2.herokuapp.com/webresources/')
    .controller('UsuariosController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', 'usuariosSvc','authSvc', function($scope, $rootScope, $http, $location, $routeParams, usuariosSvc, authSvc){

        $scope.usuarioActual = {};
        $scope.usuarioNuevo = {};
        $scope.usuariologueado= {};
        $scope.showTable = true;
        $scope.showCreate = false;
        $scope.showUpdate = false;
        $scope.loggued = false;
        $scope.hayError = false;
        $scope.error1;
        $scope.envioUsuario = false;
        $scope.envioPass = false;
        $scope.envioNombre = false;
        $scope.envioApellido = false;
        $scope.envioMail = false;
        $scope.envioTelefono = false;
        $scope.envioId = false;
        $scope.envioDir = false;
        $scope.envioConfirmacion = false;
        $scope.confirmacion = "";
        $scope.submitted=false;
        
        //CREATE
        $scope.create = function(){
            var json = {};
            //TODO Hacer validaciones y formar el JSON
            $scope.envioUsuario=true;
            $scope.envioPass = true;
            $scope.envioNombre = true;
            $scope.envioApellido = true;
            $scope.envioMail = true;
            $scope.envioTelefono = true;
            $scope.envioId = true;
            $scope.envioConfirmacion = true;
            $scope.envioDir = true;
            $scope.submitted=true;

            json.nombre = $scope.usuarioNuevo.nombre;
            json.apellido = $scope.usuarioNuevo.apellido;
            json.email = $scope.usuarioNuevo.email;
            json.cedula = $scope.usuarioNuevo.cedula;
            json.usuario = $scope.usuarioNuevo.usuario;
            json.telefono = $scope.usuarioNuevo.telefono;
            json.direccion = $scope.usuarioNuevo.direccion;
            json.password = $scope.usuarioNuevo.password;

            if(json !== {}){
                usuariosSvc.create(json).then(function successCallback(response) {
                    $scope.retrieve();
                    $scope.showTable = true;
                    $scope.showCreate = false;
                    $scope.showUpdate = false;
                    $scope.submitted = false;
                    $scope.usuarioNuevo = {};
                    $scope.confirmacion= "";
                    
                    if(window.location.port)
                    {
                          window.location = "http://" + window.location.hostname + ":" + window.location.port + "/login.html";
                    }

                    else
                    {
                         window.location = "http://" + window.location.hostname + "/login.html";
                    }

                }, function errorCallback(response) {
                    console.log('error');
                    //$scope.usuarioNuevo = {};
                    $scope.hayError = true;
                    $scope.error1 = response.data.error;
                    //TODO Mostrar mensaje de error al usuario
                });
            }
        };


        //RETRIEVE
        $scope.retrieve = function(){
            usuariosSvc.retrieve().then(function successCallback(response) {
                
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
            $scope.envioUsuario=true;
            $scope.envioPass = true;
            $scope.envioNombre = true;
            $scope.envioApellido = true;
            $scope.envioMail = true;
            $scope.envioTelefono = true;
            $scope.envioId = true;
            $scope.envioConfirmacion = true;
            $scope.envioDir = true;
            $scope.submitted = true;

            console.log($scope.confirmacion);
            json.id = $scope.usuarioActual.id;
            json.nombre = $scope.usuarioActual.nombre;
            json.apellido = $scope.usuarioActual.apellido;
            json.email = $scope.usuarioActual.email;
            json.cedula = $scope.usuarioActual.cedula;
            json.usuario = $scope.usuarioActual.usuario;
            json.telefono = $scope.usuarioActual.telefono;
            json.direccion = $scope.usuarioActual.direccion;
            json.password = $scope.usuarioActual.password;

            if(json !== {} && $scope.mismaPasswordActual($scope.usuarioActual.confirma) ){
                usuariosSvc.update(json).then(function successCallback(response) {
                    $scope.retrieve();
                    $scope.showTable = true;
                    $scope.showCreate = false;
                    $scope.showUpdate = false;
                    $scope.submitted = false;
                    $scope.usuarioNuevo = {};
                    $scope.confirmacion= "";
                }, function errorCallback(response) {
                    console.log('error');
                    $scope.hayError = true;
                    $scope.error1 = response.data.error;
                    //TODO Mostrar mensaje de error al usuario
                });
            }
        };


        //DELETE
        $scope.delete = function( id, user ){

            //TODO Poner esto de la confirmación más lindo
            var con = confirm("¿Está seguro de que quiere eliminar el elemento con nombre de usuario: " + user + "?");

            if( con == true ){
                usuariosSvc.delete(id).then(function successCallback(response) {
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
            $scope.usuarioActual = item;
        };

        //Nuevo
        $scope.new = function( item ){
            $scope.showTable = false;
            $scope.showCreate = true;
            $scope.showUpdate = false;
            $scope.usuarioNuevo = {};
        };


        //Cancelar
        $scope.cancel = function( item ){
            $scope.showTable = true;
            $scope.showCreate = false;
            $scope.showUpdate = false;
            $scope.usuarioNuevo = {};
        };
        
        //Confirma que al registrarse la contraseña y la confirmación de contraseña sean las mismas
        $scope.mismaPassword = function( confirmacion ){
            console.log(confirmacion);
            console.log(angular.equals($scope.usuarioNuevo.password, confirmacion));
            return angular.equals($scope.usuarioNuevo.password, confirmacion);
        };

        //Confirma que al registrarse la contraseña y la confirmación de contraseña sean las mismas
        $scope.mismaPasswordActual = function( confirmacion ){
            return angular.equals($scope.usuarioActual.password, confirmacion);
        };

        //Dice si el usuario se encuentra logueado o no en la app
        $scope.isLoggued = function(  ){
            return $scope.loggued;
        };

        //Cambia el estado de isLoggued
        $scope.changeLoggued = function(  ){
            $scope.loggued = !$scope.loggued;
        };
        
        //Login
        $scope.login = function( ){
            $scope.submitted=true;
            usuariosSvc.login($scope.usuarioNuevo.usuario, $scope.usuarioNuevo.password).then(function successCallback(response) {
                
                $scope.usuariologueado = response.data.usuario;
                authSvc.saveId(response.data.usuario.id);
                authSvc.saveToken(response.data.token);
                console.log(authSvc.getId());
                $scope.hayError=false;
                $scope.loggued = true;
                
                    if(angular.equals($scope.usuariologueado.rol.descripcion, "ADMINISTRADOR"))
                    {
                         if(window.location.port)
                         {
                            window.location = "http://" + window.location.hostname + ":" + window.location.port + "/admin.html";
                         }

                        else
                         {
                            window.location = "http://" + window.location.hostname + "/admin.html";
                         }
                    }
                
                    
                    else if(angular.equals($scope.usuariologueado.rol.descripcion, "USUARIO"))
                    {
                         if(window.location.port)
                         {
                            window.location = "http://" + window.location.hostname + ":" + window.location.port + "/user.html";
                         }

                        else
                         {
                            window.location = "http://" + window.location.hostname + "/user.html";
                         }
                    }
                
                    else if(angular.equals($scope.usuariologueado.rol.descripcion, "FUNCIONARIO"))
                    {
                         if(window.location.port)
                         {
                            window.location = "http://" + window.location.hostname + ":" + window.location.port + "/funcionario.html";
                         }

                        else
                         {
                            window.location = "http://" + window.location.hostname + "/funcionario.html";
                         }
                    }
               
            }, function errorCallback(response) {
                $scope.hayError=true;
                $scope.error1 = response.data.error;
                //TODO Mostrar mensaje de error al usuario
            });
        };
        
        //Logout
        $scope.logout = function( ){

            authSvc.logout();

            if(window.location.port)
            {
                window.location = "http://" + window.location.hostname + ":" + window.location.port + "/login.html";
            }
            else
            {
                window.location = "http://" + window.location.hostname + "/login.html";
            }

            usuariosSvc.logout().then(function successCallback(response) {
                $scope.loggued = false;
                
            }, function errorCallback(response) {
                console.log('error');
                //TODO Mostrar mensaje de error al usuario
            });
        };

        //Retorna si hubo error al realizar alguna de las funciones del controlador
        $scope.darError = function( ){
            return $scope.hayError;
        };

        $scope.cerrarError = function(  ){
            $scope.hayError = !$scope.hayError;
            $scope.submitted=false;
        };

        $scope.setEnFalso = function(enviado){

            if(angular.equals(enviado, "envioUsuario"))
            {
                $scope.envioUsuario = false;
            }

            else if(angular.equals(enviado, "envioPass"))
            {
                $scope.envioPass = false;
            }

            else if(angular.equals(enviado, "envioNombre"))
            {
                $scope.envioNombre = false;
            }

            else if(angular.equals(enviado, "envioApellido"))
            {
                $scope.envioApellido = false;
            }

            else if(angular.equals(enviado, "envioMail"))
            {
                $scope.envioMail = false;
            }

            else if(angular.equals(enviado, "envioId"))
            {
                $scope.envioId = false;
            }

            else if(angular.equals(enviado, "envioDir"))
            {
                $scope.envioDir = false;
            }

            else if(angular.equals(enviado, "envioTelefono"))
            {
                $scope.envioTelefono = false;
            }

            else if(angular.equals(enviado, "envioConfirmacion"))
            {
                $scope.envioConfirmacion = false;
            }
            
            else if(angular.equals(enviado, "submitted"))
            {
                $scope.submitted = false;
            }
            
        };

    }]);