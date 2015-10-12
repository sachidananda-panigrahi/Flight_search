
var app = angular.module('flightApp');
app.value('FieldTypes', {
    text: ['Text', 'should be text'],
    email: ['Email', 'should be an email address'],
    number: ['Number', 'should be a number'],
    date: ['Date', 'should be a date'],
    datetime: ['Datetime', 'should be a datetime'],
    time: ['Time', 'should be a time'],
    month: ['Month', 'should be a month'],
    week: ['Week', 'should be a week'],
    url: ['URL', 'should be a URL'],
    tel: ['Phone Number', 'should be a phone number'],
    color: ['Color', 'should be a color']
})
    .directive('formField', function ($timeout, FieldTypes) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'views/form-field.html',
            scope: {
                field: '@',
                icons: '@',
                type: '@',
                models: '@',
                required: '@'
            },
            link: function ( $scope, element, attr) {
                $scope.$on('record:invalid', function () {
                    $scope[$scope.field].$setDirty();
                });


                $scope.search = function (value) {

                };

                $timeout(function(){
                    $('.datepicker').pickadate({
                        selectMonths: true, // Creates a dropdown to control month
                        selectYears: 15, // Creates a dropdown of 15 years to control year
                        min: true,
                        onOpen: function () {
                            this.clear();
                        },
                        onSet: function () {
                            /*var x,y,year,date,month;
                             x = $('.datepicker1').pickadate().val().toString();
                             y = x.split(/[ ,]+/);
                             date = y[0];
                             month = y[1];
                             year = y[2];
                             console.log(y[0]+" "+ y[1]+ " "+ y[2]);
                             if(date && month && year){
                             this.close();
                             }*/
                        }
                    });
                },100)

            }

        };
    });
