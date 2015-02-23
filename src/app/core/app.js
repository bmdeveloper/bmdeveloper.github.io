(function () {
    'use strict';
    var photoFeedApp = angular.module('photoFeedApp', [
      'ngRoute',
      'photoFeedApp.photoListPage',
      'photoFeedApp.photoDetailsPage',
      'photoFeedServices'
    ]);

    //Configure routing of app
    photoFeedApp.config(['$routeProvider',
         function ($routeProvider) {
             $routeProvider.
               otherwise({
                   redirectTo: '/photos'
               });
         }]);
})();
