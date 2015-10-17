app.controller('mainController', function ($scope, $mdSidenav) {
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };
})
    .controller('homeController', function ($scope, $rootScope, $location, $timeout, $q, allCities, $selectedAirport, $storeSearchAirports) {
        var self = this,
            searchListArr = [];

        $scope.fromStates = loadAll();
        $scope.toStates = loadAll();
        $scope.selectedFrom = null;
        $scope.selectedTo = null;
        $scope.searchTextFrom = null;
        $scope.searchTextTo = null;
        $scope.fromAirport = "dasdas";
        $scope.toAirport = null;
        $scope.selectedItemChangeFrom = selectedItemChangeFrom;
        $scope.searchTextChangeFrom = searchTextChangeFrom;
        $scope.selectedItemChangeTo = selectedItemChangeTo;
        $scope.searchTextChangeTo = searchTextChangeTo;

        function searchTextChangeFrom(text) {
            //console.log('Text changed to ' + text);
        }
        function selectedItemChangeFrom(item) {
            $selectedAirport.setSelected(item);
            console.log('Item changed to ' + JSON.stringify(item));
            console.log($selectedAirport.getSelected());
        }
        function searchTextChangeTo(text) {
            //console.log('Text changed to ' + text);
        }

        function selectedItemChangeTo(item) {
            $selectedAirport.setSelected(item);
            console.log('Item changed to ' + JSON.stringify(item));
            console.log($selectedAirport.getSelected());
        }

        searchListArr = $storeSearchAirports.getSearchedList();
        if(searchListArr != null){
            if(searchListArr.length > 0){
                console.log(searchListArr);
                //$scope.item.name = searchListArr[0];
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
            $location.url('/search');
        }

    }).controller('searchController', function($scope, $rootScope, $location, $timeout, $q, $mdSidenav, allCities, $selectedAirport,$interval, $storeSearchAirports){
        var self = this, j= 0, counter = 0;

        self.mode = 'query';
        self.activated = true;
        $scope.determinateValue = -10;


        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };

        $scope.airports = $selectedAirport.getSelected();

        $storeSearchAirports.setSearchedList($selectedAirport.getSelected());

        if($scope.airports.length == 0){
            //$location.url('/home');
        }

        $interval(function () {
            $scope.determinateValue += 3;
            if ($scope.determinateValue > 110) $scope.determinateValue = -10;
            // Incrementally start animation the five (5) Indeterminate,
            // themed progress circular bars

            if (counter++ % 4 == 0) j++;
            // Show the indicator in the "Used within Containers" after 200ms delay
            if (j == 2) self.contained = "indeterminate";
        }, 100, 0, true);


        console.log($scope.airports[0]);
    });
