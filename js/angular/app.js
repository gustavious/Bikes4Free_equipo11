'use strict';

angular.module('bikeApp',['ngRoute', 'ngCookies', 'bikeApp.tipos', 'bikeApp.multas', 'bikeApp.puntos', 'bikeApp.usuarios', 'bikeApp.reservasAdmin', 'bikeApp.reservasUser', 'bikeApp.tabla', 'bikeApp.form', 'bikeApp.update'])
    .constant('BACKEND', 'http://b4f2.herokuapp.com/webresources/')
    .config(['$routeProvider','$httpProvider', function ($routeProvider, $httpProvider){
        $routeProvider.otherwise({
            redirectTo:'/'
        });

        $httpProvider.interceptors.push("authInterceptor");
    }]);