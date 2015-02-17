﻿(function () {
    'use strict';
    var photoFeedControllers = angular.module('photoFeedControllers', ['ngSanitize', 'infinite-scroll']);

    photoFeedControllers.controller('PhotoListController', ['$scope', 'flickrPhotosService', '$timeout',
      function ($scope, flickrPhotosService, $timeout) {

          // variable to check whether new page data is loading
          $scope.infiniteBusy = false;

          $scope.photoListData = flickrPhotosService.getPhotos({}, function (data) {
              $scope.photoList = data.photos.photo;

              // if more than one additional page has been loaded make sure to load them all.
              if (flickrPhotosService.pageToLoad > 2) {
                  for (var i = 2; i < flickrPhotosService.pageToLoad; i++) {
                      getPhotosbyPage(i, false);

                  }
              }

              //function to load the next page for infinite scroll functionality  
              $scope.nextPage = function () {

                  //check first to see if the next page exists
                  if (flickrPhotosService.pageToLoad < data.photos.pages) {
                      loadnextPage(flickrPhotosService.pageToLoad);
                  }
              };

              //fucntion to load next page for infinite scroll
              function loadnextPage(pageNumber) {
                  if ($scope.infiniteBusy) {
                      return;
                  }
                  $scope.infiniteBusy = true;
                  getPhotosbyPage(pageNumber, true);
                  flickrPhotosService.pageToLoad++;
              }

              //shared function used for both infinite scroll and loading many pages at once fuctionality
              function getPhotosbyPage(pageNo, scrollEvent) {
                  flickrPhotosService.getPhotos({ page: pageNo }, function (pageData) {
                      var pagePhotos = pageData.photos.photo;
                      $scope.photoList = $scope.photoList.concat(pagePhotos);

                      if (scrollEvent) {
                          $scope.infiniteBusy = false;
                      }
                  });
              }
          });
      }]);

    photoFeedControllers.controller('PhotoDetailsController', ['$scope', '$routeParams', '$sce', 'flickrPhotosService', '$timeout',
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
