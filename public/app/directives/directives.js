app.directive('fromAirport', function (allCities, $selectedAirport, $storeSearchAirports) {
    return {
        restrict: 'EA',
        templateUrl: 'views/airport-autocomplete.html',
        scope: {
            formName: '=',
            inputName: '='
        },
        link: function ($scope, element, attr, form) {
            var self = this,
                searchListArr = [];
            console.log("$scope.formName");
            console.log($scope.formName);
            $scope.fromStates = loadAll();
            $scope.toStates = loadAll();
            $scope.selectedFrom = null;
            $scope.selectedTo = null;
            $scope.searchTextFrom = null;
            $scope.searchTextTo = null;
            $scope.fromAirport = "dasdas";
            $scope.toAirport = "ti";
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
            $scope.returnIfTouched = function(){
                return $scope.formName.twoWayFrom.$touched;
            }


        }
    };
});
