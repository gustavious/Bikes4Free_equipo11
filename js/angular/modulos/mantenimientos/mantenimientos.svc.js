function mantenimientosService($http, BACKEND) {
    var self = this;    
    
    self.update = function( json ){
        return $http({
            method: 'PUT',
            url: BACKEND + 'solicitudesMantenimiento/' + id,
            contentType: "application/json",
            data: json
        });
    };
    
    self.create = function( json ){
        return $http({
            method: 'POST',
            url: BACKEND + 'solicitudesMantenimiento',
            contentType: "application/json",
            data: json
        });
    };
    
    self.retrieve = function(){
        return $http({
            method: 'GET',
            url: BACKEND + 'solicitudesMantenimiento'
        });
    };
    
    self.delete = function( id ){
        return $http({
            method: 'DELETE',
            url: BACKEND + 'solicitudesMantenimiento/' + id
        });
    };

};

angular.module('bikeApp').service('mantenimientosSvc', mantenimientosService);
