app.directive('fromAirport', function (allCities, $selectedAirport, $storeSearchAirports) {
    return {
        restrict: 'EAC',
        scope: {
            formname: '=',
            formfieldname: '@',
            selecteditem: '=',
            searchtext: '=',
            floatinglabel: '@',
            isdisabled: '='
        },
        templateUrl: 'views/airport-autocomplete.html',
        link: function ($scope, element, attr, form) {
            var selectedAirportData = {},
                formFieldName = $scope.formfieldname;
            $scope.fromStates = loadAll();
            $scope.selectedFrom = null;
            $scope.selectedTo = null;
            $scope.searchTextFrom = null;
            $scope.searchTextTo = null;
            $scope.selectedItemChangeFrom = selectedItemChangeFrom;
            $scope.searchTextChangeFrom = searchTextChangeFrom;


            function searchTextChangeFrom(text) {
                //console.log('Text changed to ' + text);
            }

            function selectedItemChangeFrom(item) {
                selectedAirportData[formFieldName] = item;
                $selectedAirport.setSelected(selectedAirportData);
            }

            function loadAll() {
                var allStates = allCities;
                return allStates[0];
            }

        }
    };
});
