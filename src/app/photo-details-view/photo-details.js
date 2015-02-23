(function () {
    'use strict';
    var photoDetailsPage = angular.module('photoFeedApp.photoDetailsPage', ['ngSanitize', 'ngRoute']);

    photoDetailsPage.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/photos/:photoId', {
            templateUrl: 'dist/photo-details-view/photo-details.html',
            controller: 'PhotoDetailsController'
        });
    }]);

    photoDetailsPage.controller('PhotoDetailsController', ['$scope', '$routeParams', '$sce', 'flickrPhotosService', '$timeout',
      function ($scope, $routeParams, $sce, flickrPhotosService, $timeout) {

          $scope.photoDetailsData = flickrPhotosService.getPhotoById($routeParams.photoId, function (data) {
              var description = data.photo.description._content;
              var ownerId = data.photo.owner.nsid;
              var ownerUserName = data.photo.owner.username;

              var defaultDescription = "<a target=_blank href=\"https://www.flickr.com/people/" + ownerId + "\">" + ownerUserName + "<\/a> posted a photo";

              //description comes through as html so make sure to parse this
              $scope.PhotoDescription = $sce.trustAsHtml(description || defaultDescription);
          });

          $timeout(function () {
              // Workaround to fix loading of the images in Firefox, iOS Safari and Internet explorer
              picturefill();
          }, 1000);
      }]);
})();
