function usuariosService($http, BACKEND) {
    var self = this;
    var idUsuario;
    
    self.setIdUsuario = function(param){
        this.idUsuario = param;
    };
    
     self.getIdUsuario = function(){
        return this.idUsuario;
    };

    self.create = function( json ){
        return $http({
            method: 'POST',
            url: BACKEND + 'auth/register',
            contentType: "application/json",
            data: json
        });
    };


    self.login = function( username, pass ){
        return $http({
            method: 'POST',
            url: BACKEND + 'auth/login/',
            contentType: "application/json",
            data:  {
                      usuario:username,
                      password:pass
                   }
        });
    };

    self.update = function( json ){
        return $http({
            method: 'PUT',
            url: BACKEND + 'usuarios/' + json.id,
            contentType: "application/json",
            data: json
        });
    };

    self.logout = function(){
        return $http.get(BACKEND + 'auth/logout');
    };

    self.retrieve = function(){
        return $http.get(BACKEND + 'usuarios');
    };

    
    self.delete = function( id ){
        return $http({
            method: 'DELETE',
            url: BACKEND + 'usuarios/' + id
        });
    };

    
    self.retrieveOne = function( id ){
        return $http({
            method: 'GET',
            url: BACKEND + 'auth/usuarios/' + id
        });
    };

};

angular.module('bikeApp').service('usuariosSvc', usuariosService);
