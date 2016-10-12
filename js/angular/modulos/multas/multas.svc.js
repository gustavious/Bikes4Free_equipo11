function multasService($http, BACKEND) {
    var self = this;

    self.create = function( json ){
        return $http({
            method: 'POST',
            url: BACKEND + 'multas',
            contentType: "application/json",
            data: json
        });
    };
    
    
    self.update = function( json ){
        return $http({
            method: 'PUT',
            url: BACKEND + 'multas/' + json.id,
            contentType: "application/json",
            data: json
        });
    };
    
    
    self.retrieve = function(){
        return $http({
            method: 'GET',
            url: BACKEND + 'multas'
        });
    };

    
    self.delete = function( id ){
        return $http({
            method: 'DELETE',
            url: BACKEND + 'multas/' + id
        });
    };

    
    self.retrieveOne = function( id ){
        return $http({
            method: 'GET',
            url: BACKEND + 'multas/' + id
        });
    };

};

angular.module('bikeApp').service('multasSvc', multasService);
