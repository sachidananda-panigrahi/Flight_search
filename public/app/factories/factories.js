app.factory('$cities', function ($http) {
    var config = {cache: false};
    return {
        get : function(){
            return $http({method: 'GET', url: '/api/cities', cache: false});
        },
        post : function(data){
            return $http({method: 'POST', url: '/api/cities', data: data, cache: false});
        }

    }

});