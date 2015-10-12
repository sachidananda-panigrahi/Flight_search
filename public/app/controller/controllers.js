
app.controller('mainController', function ($scope, $mdSidenav) {
    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };
})
    .controller('homeController', function ($scope, $rootScope, $location, $timeout, $q, allCities, $selectedAirport) {

        var self = this;
        // list of `state` value/display objects
        self.states        = loadAll();
        self.selectedItem  = null;
        self.searchText    = null;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange   = searchTextChange;

        function searchTextChange(text) {
            //console.log('Text changed to ' + text);
        }
        function selectedItemChange(item) {
            $selectedAirport.setSelected(item);
            console.log('Item changed to ' + JSON.stringify(item));
            console.log($selectedAirport.getSelected());
        }


        function loadAll() {
            var allStates = allCities;
            //console.log(allStates[0][0].name);
            return allStates[0];
        }
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

        $scope.submit = function(){
            $location.url('/search');
        }

    }).controller('searchController', function($scope, $rootScope, $location, $timeout, $q, $mdSidenav, allCities, $selectedAirport){
        $scope.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
        };

        $scope.airports = $selectedAirport.getSelected();
        console.log($scope.airports[0]);
    });
