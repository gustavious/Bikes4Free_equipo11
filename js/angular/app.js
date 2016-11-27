'use strict';

angular.module('bikeApp',['ngRoute', 'ngCookies', 'bikeApp.tipos', 'bikeApp.multas', 'bikeApp.puntos', 'bikeApp.mantenimientos', 'bikeApp.usuarios', 'bikeApp.reservasAdmin', 'bikeApp.reservasUser', 'bikeApp.tabla', 'bikeApp.form', 'bikeApp.update'])
    .constant('BACKEND', 'http://localhost:8083/webresources/')
    .config(['$routeProvider','$httpProvider', function ($routeProvider, $httpProvider){
        $routeProvider.otherwise({
            redirectTo:'/'
        });

        $httpProvider.interceptors.push("authInterceptor");
    }]);
