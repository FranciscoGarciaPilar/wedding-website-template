define([
    'angular',
    'text!landing/template.html',
    'ngAnimate'
], function (angular, template) {
    angular.module('Landing', ['ngAnimate'])
        .controller('LandingCtrl', ['$scope' , function ($scope) {
            $scope.showMessage = false;
            $scope.bigDay = new Date('2016-12-17T05:00:01.000Z');
            $scope.daysToEvent = Math.floor(($scope.bigDay.getTime() - (new Date().getTime())) / (1000 * 60 * 60 * 24));
        }])
        .directive('countDown', [ '$timeout', function ($timeout) {
            return {
                restrict: 'A',
                controller: 'LandingCtrl',
                template: template,
                link: function (scope) {
                    $timeout(function () {
                        scope.showMessage = true;
                    }, 1500);
                }
            };
        }])
        .directive('welcome', ['$animate', function ($animate) {
            return {
                restrict: 'A',
                link: function (scope, elem) {
                    $animate.addClass(elem, 'slide-in');
                }
            }
        }])
        .directive('enter', [ '$timeout', '$animate', function ($timeout, $animate) {
            return {
                restrict: 'A',
                link: function (scope, elem) {
                    $timeout(function () {
                        $animate.addClass(elem, 'enter-show');
                    }, 2500);
                }
            };
        }]);
});