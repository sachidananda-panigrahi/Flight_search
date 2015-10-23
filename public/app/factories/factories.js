app.factory('$cities', function ($http) {
    return {
        get : function(){
            return $http.get('/api/cities');
        },
        post : function(data){
            return $http.post('/api/cities', data);
        }

    }

});