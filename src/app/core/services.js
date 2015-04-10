(function () {
    'use strict';
    var photoFeedServices = angular.module('photoFeedServices', ['ngResource']);

    photoFeedServices.factory('flickrPhotosService', ['$resource', function ($resource) {

        var publicPhotoBaseUrl = 'https://api.flickr.com/services/rest/';

        var api_key = '4e5708f9ab5d15dfb115bcd109c21743';

        var photosData = $resource(publicPhotoBaseUrl, { method: 'flickr.photos.search', api_key: api_key, tag_mode: 'all', per_page: '20', extras: 'date_upload,owner_name', tags: 'sunset', format: 'json', nojsoncallback: '1' }, {
            get: { method: 'GET', cache: true }
        });

        var photoDataById = $resource(publicPhotoBaseUrl, {
            method: 'flickr.photos.getInfo', api_key: api_key, format: 'json', nojsoncallback: '1'
        }, {
            get: { method: 'GET', cache: true }
        });

        var pageToLoad = 2;

        var flickrPhotoClass = {
            //variable to maintain a count of the next page load
            pageToLoad: pageToLoad,
            //function to get photo list
            getPhotos: getPhotos,
            //function to get photo information by id
            getPhotoById: getPhotoById
        };

        return flickrPhotoClass;

        function getPhotos (params, callback) {
            return photosData.get(params, callback);
        }

        function getPhotoById(id, callback) {
            return photoDataById.get({ photo_id: id }, callback);
        }

    }]);
})();



