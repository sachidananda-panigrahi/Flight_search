app.factory('$cities', function ($http) {
    return {
        get : function(){
            return $http.get('/api/cities');
        }

    }

});