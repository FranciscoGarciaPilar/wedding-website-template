/**
 * Require Config is setup and the define to launch the main app is set.
 */
require.config({
    paths: {
        domReady: site.url.bower + '/requirejs-domready/domReady',
        text: site.url.bower + '/requirejs-text/text',
        angular: site.url.bower + '/angular/angular',
        ngAnimate: site.url.bower + '/angular-animate/angular-animate',
        ngRoute: site.url.bower + '/angular-route/angular-route'
    },
    baseUrl: site.url.js,
    shim: {
        angular: {exports: 'angular'},
        ngAnimate: {deps: ['angular']},
        ngRoute: {deps: ['angular']}
    },
    priority: [
        'angular'
    ]
});
require([
    'domReady',
    'angular',
    'app'
], function (domReady, angular) {
    domReady(function () {
        angular.bootstrap(document, ['app']);
    });
});
