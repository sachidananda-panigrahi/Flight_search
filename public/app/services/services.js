
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
        if(this.selected.length < 2){
            this.selected.push(data);
        }else{
            this.selected = [];
        }
    };
    this.getSelected = function(){
        return this.selected;
    };
});