/**
 * Created by sean on 2/17/14.
 */
/**
 * This is the app launch page that launches card initialization.
 */
define([
    'angular',
    'landing/landing',
    'main/main'
], function (angular) {
    return angular.module('app', [
        'Landing',
        'Main'
    ]);
});
