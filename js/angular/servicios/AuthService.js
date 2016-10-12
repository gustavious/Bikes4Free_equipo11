//-----------------------------------------------------
//Encargado de interceptar las peticiones http
//-----------------------------------------------------
function authInterceptor(BACKEND, authSvc) {
    return {
        //Intercept the request
        request: function (config) {
            // automatically attach x_rest_user (Authorization) header 
            // if there´s a token saved and the request is to the API
            var token = authSvc.getToken();
            if (config.url.indexOf(BACKEND) === 0 && token) {
                
                config.headers.Authorization = "JWT "+token;
//                 alert("INTERCEPTADO: "+config.url+" HAY TOKEN");
            }
           
            return config;
        },
        //Intercept the response
        response: function (res) {
           
            return res;
        }
    };
}
;

function authService($window) {
    var self = this;

    // Add JWT methods here
    self.parseJwt = function (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(base64));
    };

    self.saveToken = function (token) {
        $window.localStorage['jwtToken'] = token;
    };
    
    self.saveId = function (param) {
        $window.localStorage['iduser'] = param;
    };
    
    self.getId = function () {
        return $window.localStorage['iduser'];
    };
    
    self.getToken = function () {
        return $window.localStorage['jwtToken'];
    };

    self.isAuthed = function () {
        return self.getToken();
        //VALIDAR FECHA EXPIRACION
//        if (token) {
//            var params = self.parseJwt(token);
//            return Math.round(new Date().getTime() / 1000) <= params.exp;
//        } else {
//            return false;
//        }

    };

    self.logout = function () {
        $window.localStorage.removeItem('jwtToken');
        $window.localStorage.removeItem('iduser');
    };
}
;

angular.module('bikeApp')
        .factory('authInterceptor', authInterceptor)
        .service('authSvc', authService);