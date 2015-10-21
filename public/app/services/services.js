
var app = angular.module('flightApp');
app.service('InitService', ['$q', function ($q) {
    var d = $q.defer();
    return {
        defer: d,
        promise: d.promise
    };
}]).service('$selectedAirport', function(){
    this.selected = [];
    this.counter = 0;
    this.index = 0;

    this.setSelected = function(data){
        if(this.selected.length == 0){
            this.selected.push(data);
        }else{
            for(var index=0; index < this.selected.length; index++){
                if(JSON.stringify(this.selected[index]) === JSON.stringify(data)){
                    console.log("inside true");
                    this.counter ++;
                    this.index = index;
                    break
                }
            }
            if(this.counter){
                this.selected[this.index] = data;
            }else{
                this.selected.push(data);
            }
        }
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
            return JSON.parse(localStorage.getItem('searchedList'));
        }else{

        }
    };


});