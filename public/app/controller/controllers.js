app.controller('mainController', function ($scope, $mdSidenav) {
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };
})
    .controller('homeController', function ($scope, $rootScope, $location, $timeout, $q, allCities, $selectedAirport, $storeSearchAirports, $cities) {
        var self = this,
            searchListArr = [];


        $scope.fromAirport = null;
        $scope.toAirport = null;


        searchListArr = $storeSearchAirports.getSearchedList("searchedList");
        if (searchListArr != null) {
            if (searchListArr.length > 0) {
                $scope.fromAirport = searchListArr[0].twoWayFromAirport.name;
                if(searchListArr.length > 1){
                    $scope.toAirport = searchListArr[1].twoWayToAirport.name;
                }

            }
        }


        function loadAll() {
            var allStates = allCities;
            //console.log(allStates[0][0].name);
            return allStates[0];
        }

        $scope.dateChange = function () {
            $scope.returnDate = new Date(
                $scope.journeyDate.getFullYear(),
                $scope.journeyDate.getMonth(),
                $scope.journeyDate.getDate()
            );
            $scope.minRetDate = new Date(
                $scope.journeyDate.getFullYear(),
                $scope.journeyDate.getMonth(),
                $scope.journeyDate.getDate()
            );
            $scope.maxRetDate = new Date(
                $scope.returnDate.getFullYear(),
                $scope.returnDate.getMonth() + 2,
                $scope.returnDate.getDate()
            );
        };

        $scope.journeyDate = new Date();
        $scope.minDate = new Date(
            $scope.journeyDate.getFullYear(),
            $scope.journeyDate.getMonth(),
            $scope.journeyDate.getDate());
        $scope.maxDate = new Date(
            $scope.journeyDate.getFullYear(),
            $scope.journeyDate.getMonth() + 2,
            $scope.journeyDate.getDate());

        $scope.returnDate = new Date(
            $scope.journeyDate.getFullYear(),
            $scope.journeyDate.getMonth(),
            $scope.journeyDate.getDate()
        );
        $scope.minRetDate = new Date(
            $scope.journeyDate.getFullYear(),
            $scope.journeyDate.getMonth(),
            $scope.journeyDate.getDate()
        );
        $scope.maxRetDate = new Date(
            $scope.returnDate.getFullYear(),
            $scope.returnDate.getMonth() + 2,
            $scope.returnDate.getDate()
        );

        $scope.oneWayjourneyDate = new Date(
            $scope.journeyDate.getFullYear(),
            $scope.journeyDate.getMonth(),
            $scope.journeyDate.getDate()
        );
        $scope.oneWayMinDate = new Date(
            $scope.journeyDate.getFullYear(),
            $scope.journeyDate.getMonth(),
            $scope.journeyDate.getDate()
        );


        $scope.submit = function () {
            $cities.post(searchListArr).success(function(res){
                $location.url('/search');
            });
        }

    }).controller('searchController', function ($scope, $rootScope, $location, $timeout, $q, $mdSidenav, allCities, $selectedAirport, $interval, $storeSearchAirports, $getSearchedFlightDetails) {
        var self = this, j = 0, counter = 0, airportList = $selectedAirport.getSelected();

        $scope.mode = ['query'];
        $scope.activated = true;

        $scope.determinateValue = -10;

        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };

        $scope.airports = airportList;
        if(airportList.length > 0){
            console.log("airportList before set localstorage");
            console.log(airportList);
            $storeSearchAirports.setSearchedList('searchedList',airportList);
        }

        if ($scope.airports.length == 0) {
            $scope.airports = $storeSearchAirports.getSearchedList("searchedList");
            //$location.url('/home');
        }
        $getSearchedFlightDetails.then(function(res){
            console.log(res.people);
            $scope.searchedFlightDetails= res;
            //$scope.searchedFlightDetails= new Array(res);
            $scope.modes = [];

        });
        $interval(function () {
            $scope.determinateValue += 3;
            if ($scope.determinateValue > 110) $scope.determinateValue = -10;
            // Incrementally start animation the five (5) Indeterminate,
            // themed progress circular bars

            if (counter++ % 4 == 0) j++;
            // Show the indicator in the "Used within Containers" after 200ms delay
            if (j == 2) self.contained = "indeterminate";
        }, 100, 0, true);

        $interval(function() {
            self.mode = (self.mode == 'query' ? 'determinate' : 'query');
        }, 7200, 0, true);

    });
