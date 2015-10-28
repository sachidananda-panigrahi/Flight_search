'use strict';
var app = angular.module('flightApp', ['md.data.table', 'ngMaterial', 'ngRoute', 'ngResource', 'ngMessages', 'LocalStorageModule']);

app.config(function ($routeProvider, $locationProvider, $mdThemingProvider, localStorageServiceProvider) {

//    Theme
    $mdThemingProvider.theme('default')
        .primaryPalette('purple')
        .accentPalette('light-blue')
        .warnPalette('red')
        .backgroundPalette('grey');
//    Storage
    localStorageServiceProvider
        .setPrefix('flightApp')
        .setStorageType('localStorage')
        .setNotify(true, true);
//    Route
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
        .when('/search', {
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
            allCities.push(data);
            InitService.defer.resolve();
        })
    });
