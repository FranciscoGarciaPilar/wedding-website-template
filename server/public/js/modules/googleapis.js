define([
    'angular',
    'ngAnimate'
], function (angular) {
    angular.module('GoogleAPI', ['ngAnimate'])
        .directive('mapsIframe', ['$animate', function ($animate) {
            return {
                restrict: 'A',
                scope: {},
                template: '<div class="medium primary btn"><a data-ng-click="showMaps()">Show Google Maps</a></div>',
                link: function (scope, elem, attr) {
                    var height = 400, width = 620, location,
                        apiKey = 'yourAPIKey';

                    if (attr.mapsLocation) {
                        location = encodeURI(attr.mapsLocation);
                    }

                    /**
                     *Function to add Google Maps iFrame
                     */
                    scope.showMaps = function () {
                        $animate.addClass(elem, 'maps-open');
                        //elem.addClass('maps-open');
                        if (elem[0].offsetWidth) {
                            width = elem[0].offsetWidth;
                        }
                        elem.html('<iframe width="' + width + '" height="' + height + '" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=' + location + '&key=' + apiKey + '"></iframe>')
                    };


                }
            };
        }])
        .controller('AnalyticsController', ['$scope', 'AnalyticsFactory', function ($scope, analytics) {
            $scope.sendEvent = analytics.sendEvent;
            $scope.sendPageView = analytics.sendPageView;

        }])
        .directive('analyticsEvent', [function () {
            return {
                restrict: 'EA',
                scope: {
                    gaCategory: '=',
                    gaAction: '=',
                    gaLabel: '=',
                    gaValue: '='
                },
                controller: 'AnalyticsController',
                link: function (scope, elem, attr) {
                    scope.triggerEvent = function(){
                        scope.sendEvent(scope.gaCategory, scope.gaAction, scope.gaLabel, scope.gaValue);
                    };
                }
            }
        }])
        .directive('analyticsPageView', ['$location',function ($location) {
            return {
                restrict: 'EA',
                controller: 'AnalyticsController',
                link: function (scope, elem, attr) {
                    scope.sendPageView($location.path());
                }
            }
        }])
        .factory('AnalyticsFactory', [function () {
            var API = {};
            API.sendPageView = function (url){
                ga('send', 'pageview', url);
            };

            API.sendEvent = function (category, action, label, value) {
                ga('send', 'event', category, action, label, value)
            };

            return API;

        }]);
});