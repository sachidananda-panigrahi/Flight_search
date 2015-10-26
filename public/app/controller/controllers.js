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
                if (searchListArr.length > 1) {
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
            $cities.post(searchListArr).success(function (res) {
                $location.url('/search');
            });
        }

    }).controller('searchController', function ($scope, $rootScope, $location, $timeout, $q, $mdSidenav, $selectedAirport, $storeSearchAirports, $mdDialog, $getSearchedFlightDetails) {
        var self = this, j = 0, counter = 0, airportList = $selectedAirport.getSelected(), deferred = $q.defer();

        $scope.mode = ['query'];
        $scope.activated = true;
        $scope.determinateValue = -10;
        $scope.deferred = deferred.promise;
        $scope.status = '  ';
        $scope.airports = airportList;
        $scope.selected = [];
        $scope.query = {
            filter: '',
            order: 'name',
            limit: 5,
            page: 1
        };
//Side nav bar
        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };
//Set searched List To Local Storage
        if (airportList.length > 0) {
            $storeSearchAirports.setSearchedList('searchedList', airportList);
        }
//Set searchedList from local storage
        if ($scope.airports.length == 0) {
            $scope.airports = $storeSearchAirports.getSearchedList("searchedList");
        }
//get Searched Flight Details
        $getSearchedFlightDetails.then(function (res) {
            console.log(res[0]);
            $scope.searchedFlightDetails = res[0];
            $scope.modes = [];
            deferred.resolve();
        });
//Show Loader in data Table
        $scope.loadStuff = function () {
            $timeout(function () {
                deferred.reject();
            }, 1000);
        };
//Show alert popup
        $scope.showConfirm = function(ev,data) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete your debt?')
                .content('All of the banks have agreed to <span class="debt-be-gone">forgive</span> you your debts.')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Please do it!')
                .cancel('Sounds like a scam');
            $mdDialog.show(confirm).then(function() {
                $scope.status = 'You decided to get rid of your debt.';
            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });
        };

    });
