
var app = angular.module('flightApp');
app.service('InitService', ['$q', function ($q) {
    var d = $q.defer();
    return {
        defer: d,
        promise: d.promise
    };
}]).service('$selectedAirport', function(){
    this.selected = [];

    this.setSelected = function(data){
        this.selected.push(data);
    };
    this.getSelected = function(){
        return this.selected;
    };
}).service('$storeSearchAirports', function(){
    this.searchedList = [];

    this.setSearchedList = function(data){
        if(window.localStorage){
            localStorage.setItem('searchedList', JSON.stringify(data));
        }else{

        }
    };
    this.getSearchedList = function(){
        if(window.localStorage){
                console.log(localStorage.getItem('searchedList'))
            return JSON.parse(localStorage.getItem('searchedList'));
        }else{

        }
    };


});