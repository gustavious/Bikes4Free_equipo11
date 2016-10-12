function puntosService($http, BACKEND) {
    var self = this;

    self.create = function( json ){
        return $http({
            method: 'POST',
            url: BACKEND + 'puntos',
            contentType: "application/json",
            data: json
        });
    };
    
    
    self.update = function( json ){
        return $http({
            method: 'PUT',
            url: BACKEND + 'puntos/' + json.id,
            contentType: "application/json",
            data: json
        });
    };
    
    
    self.retrieve = function(){
        return $http({
            method: 'GET',
            url: BACKEND + 'puntos'
        });
    };

    
    self.delete = function( id ){
        return $http({
            method: 'DELETE',
            url: BACKEND + 'puntos/' + id
        });
    };

    
    self.retrieveOne = function( id ){
        return $http({
            method: 'GET',
            url: BACKEND + 'puntos/' + id
        });
    };

};

angular.module('bikeApp').service('puntosSvc', puntosService);
