var app = angular.module('flightApp', ['ngMaterial', 'ngRoute', 'ngResource', 'ngMessages']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/home', {
            controller: 'homeController',
            templateUrl: 'views/home.html',
            resolve: {
                init: ['InitService', function (Init) {
                    return Init.promise;
                }]
            }
        })
        .when('/search',{
            controller: 'searchController',
            templateUrl: 'views/search.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
    $locationProvider.html5Mode(true);
})
    .value('allCities', [])
    .run(function (allCities, $rootScope, $timeout, $cities, InitService) {
        $cities.get().success(function (data) {
            console.log(data);
            allCities.push(data);
            InitService.defer.resolve();
        })
    });
