function reservasUserService($http, BACKEND) {
    var self = this;

    self.create = function( id_usuario, json ){
        return $http({
            method: 'POST',
            url: BACKEND + 'usuarios/' + id_usuario + '/reservas',
            contentType: "application/json",
            data: json
        });
    };
    
    
    self.update = function( id_usuario, json ){
        return $http({
            method: 'PUT',
            url: BACKEND + 'usuarios/' + id_usuario + '/reservas/' + json.id,
            contentType: "application/json",
            data: json
        });
    };
    
    
    self.retrieve = function( id_usuario ){
        return $http({
            method: 'GET',
            url: BACKEND + 'usuarios/' + id_usuario + '/reservas',
        });
    };

    
    self.delete = function( id_usuario, id ){
        return $http({
            method: 'DELETE',
            url: BACKEND + 'usuarios/' + id_usuario + '/reservas/' + id
        });
    };

    
    self.retrieveOne = function( id_usuario, id ){
        return $http({
            method: 'GET',
            url: BACKEND + 'usuarios/' + id_usuario + '/reservas/' + id
        });
    };
    
    
    self.getPuntos = function(){
        return $http({
            method: 'GET',
            url: BACKEND + 'puntos'
        });
    };
    
    self.getTipos = function(){
        return $http({
            method: 'GET',
            url: BACKEND + 'tipos'
        });
    };

};

angular.module('bikeApp').service('reservasUserSvc', reservasUserService);
