define([
    'angular'
], function (angular) {
    angular.module('Gumby', [])
    /**
     * Controller is used to map the factory functions to the scope
     */
        .controller('GumbyNavbarCtrl', ['$scope', 'gumbyNavbarState', function ($scope, NavbarState) {
            $scope.isActive = NavbarState.isActive;
            $scope.setActive = NavbarState.setActive;
        }])
    /**
     * Directive should be added to the mobile menu icon
     * Ex: <a class="toggle" href="#" data-gumby-navbar="navbar"><i class="icon-menu"></i></a>
     */
        .directive('gumbyNavbar', [function () {
            return {
                restrict: 'A',
                scope: true,
                controller: 'GumbyNavbarCtrl',
                link: function (scope, elem) {
                    elem.bind('click', toggle);
                    function toggle() {
                        scope.setActive(!scope.isActive());
                    }
                    scope.$watch(function () {
                        return scope.isActive();
                    }, function (newVal) {
                        if (newVal) {
                            elem.addClass('active');
                        } else {
                            elem.removeClass('active');
                        }
                    });
                }
            };
        }])
    /**
     * Directive should be added to the UL for the mobile menu mode
     * EX:
     * <ul data-gumby-navbar-menu="navbar">
     * <li><a href="/menu1">Menu 1</a></li>
     * <li><a href="/menu2">Menu 2</a></li>
     * </ul>
     */
        .directive('gumbyNavbarMenu', [function () {
            return {
                restrict: 'A',
                scope: true,
                controller: 'GumbyNavbarCtrl',
                link: function (scope, elem) {
                    elem.find('a').bind('click', function () {
                        scope.setActive(false);
                    });
                    scope.$watch(function () {
                        return scope.isActive();
                    }, function (newVal) {
                        if (newVal) {
                            elem.addClass('active');
                        } else {
                            elem.removeClass('active');
                        }
                    });
                }
            };
        }])
    /**
     * Factory maintains the active state
     */
        .factory('gumbyNavbarState', function () {
            var API = {
                active: false,
                isActive: function () {
                    return API.active
                },
                setActive: function (active) {
                    API.active = active;
                }
            };
            return API;
        });
});