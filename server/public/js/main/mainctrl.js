define([
    'angular',
    'main/main'
], function (angular) {
    angular.module('Main').controller('MainCtrl', ['$scope', function ($scope) {
        $scope.imgLoc = site.url.img;
    }]);
});