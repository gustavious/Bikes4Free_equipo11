function tiposService($http, BACKEND) {
    var self = this;

    self.create = function( json ){
        return $http({
            method: 'POST',
            url: BACKEND + 'tipos',
            contentType: "application/json",
            data: json
        });
    };
    
    
    self.update = function( json ){
        return $http({
            method: 'PUT',
            url: BACKEND + 'tipos/' + json.id,
            contentType: "application/json",
            data: json
        });
    };
    
    
    self.retrieve = function(){
        return $http({
            method: 'GET',
            url: BACKEND + 'tipos'
        });
    };

    
    self.delete = function( id ){
        return $http({
            method: 'DELETE',
            url: BACKEND + 'tipos/' + id
        });
    };

    
    self.retrieveOne = function( id ){
        return $http({
            method: 'GET',
            url: BACKEND + 'tipos/' + id
        });
    };

};

angular.module('bikeApp').service('tiposSvc', tiposService);
