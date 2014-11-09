define([
    'angular',
    'text!main/templates/home.html',
    'text!main/templates/howwemet.html',
    'text!main/templates/proposal.html',
    'text!main/templates/weddingparty.html',
    'text!main/templates/eventdetails.html',
    'ngAnimate',
    'ngRoute',
    'modules/googleapis',
    'modules/navbar'
], function (angular, tmpMain, tmpHowWeMet, tmpProposal, tmpParty, tmpEvent) {
    angular.module('Main', ['ngAnimate', 'ngRoute','GoogleAPI','Gumby']).config(['$routeProvider', '$locationProvider' , function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/home', {
                    template: tmpMain,
                    controller: 'MainCtrl'
                }).when('/howwemet', {
                    template: tmpHowWeMet,
                    controller: 'MainCtrl'
                }).when('/proposal', {
                    template: tmpProposal,
                    controller: 'MainCtrl'
                }).when('/weddingparty', {
                    template: tmpParty,
                    controller: 'MainCtrl'
                }).when('/event', {
                    template: tmpEvent,
                    controller: 'MainCtrl'
                });
            $locationProvider.html5Mode(true);
        }]).controller('MainCtrl', ['$scope', function ($scope) {
            $scope.imgLoc = site.url.img;
        }]);
});