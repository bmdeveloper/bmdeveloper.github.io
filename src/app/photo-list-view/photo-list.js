(function () {
    'use strict';
    var photoListPage = angular.module('photoFeedApp.photoListPage', ['ngSanitize', 'infinite-scroll', 'ngRoute']);

    photoListPage.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/photos', {
            templateUrl: 'dist/photo-list-view/photo-list.html',
            controller: 'PhotoListController'
        });
    }]);

    photoListPage.controller('PhotoListController', ['$scope', 'flickrPhotosService', '$timeout',
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
})();
