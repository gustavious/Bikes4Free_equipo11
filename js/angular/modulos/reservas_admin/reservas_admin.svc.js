function reservasAdminService($http, BACKEND) {
    var self = this;    
    
    self.update = function( id_punto, id_reserva, json ){
        return $http({
            method: 'PUT',
            url: BACKEND + 'puntos/' + id_punto + '/reservas/' + id_reserva,
            contentType: "application/json",
            data: json
        });
    };
    
    
    self.retrieve = function(){
        return $http({
            method: 'GET',
            url: BACKEND + 'reservas'
        });
    };

    
    self.getPuntos = function(){
        return $http({
            method: 'GET',
            url: BACKEND + 'puntos'
        });
    };
    
    
    self.getMultas = function(){
        return $http({
            method: 'GET',
            url: BACKEND + 'multas'
        });
    };
    
    self.getReserva = function(id){
        return $http({
            method: 'GET',
            url: BACKEND + 'reservas/' + id
        });
    };

};

angular.module('bikeApp').service('reservasAdminSvc', reservasAdminService);
