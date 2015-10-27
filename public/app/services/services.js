app.service('InitService', ['$q', function ($q) {
    var d = $q.defer();
    return {
        defer: d,
        promise: d.promise
    };
}]).service('$selectedAirport', function ($storeSearchAirports) {
    this.selected = [];
    this.counter = 0;
    this.index = 0;

    if ($storeSearchAirports.getSearchedList("searchedList") != null) {
        this.selected = $storeSearchAirports.getSearchedList("searchedList");
    }

    this.setSelected = function (data) {
        this.counter = 0;
        this.index = 0;

        if (this.selected.length == 0) {
            this.selected.push(data);
        } else {
            for (var index = 0; index < this.selected.length; index++) {
                for (var key in this.selected[index]) {
                    if (data.hasOwnProperty(key)) {
                        this.counter++;
                        this.index = index;
                        break
                    }
                }
            }
            if (this.counter) {
                this.selected[this.index] = data;
            } else {
                this.selected.push(data);
            }
        }
    };
    this.getSelected = function () {
        return this.selected;
    };
}).service('$storeSearchAirports', function (localStorageService) {
    this.searchedList = [];

    this.setSearchedList = function (key, val) {
        if (localStorageService.isSupported) {
            localStorageService.set(key, val);
        } else {

        }
    };
    this.getSearchedList = function (key) {
        if (localStorageService.isSupported) {
            return localStorageService.get(key);
        } else {

        }
    };


}).service('$getSearchedFlightDetails', function ($http, $q) {
    var d = $q.defer(), config = {cache: false};
    $http({method: 'GET', url: '/api/search', cache: false}).then(function(response) {
        d.resolve(response);
    }, function(response) {
        d.reject(response);
    });

    return d.promise;
});