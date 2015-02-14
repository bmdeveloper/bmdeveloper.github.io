var photoFeedApp = angular.module('photoFeedApp', [
  'ngRoute',
  'photoFeedControllers',
  'photoFeedServices'
]);


//Configure routing of app
photoFeedApp.config(['$routeProvider',
     function ($routeProvider) {
         $routeProvider.
           when('/photos', {
               templateUrl: 'views/photo-list.html',
               controller: 'PhotoListController'
           }).
           when('/photos/:photoId', {
               templateUrl: 'views/photo-details.html',
               controller: 'PhotoDetailsController'
           }).
           otherwise({
               redirectTo: '/photos'
           });
     }]);


