

var photoFeedServices = angular.module('photoFeedServices', ['ngResource']);

photoFeedServices.factory('flickrPhotosService', ['$resource', function ($resource) {
    var flickrPhotoClass = {};

    var publicPhotoBaseUrl = 'https://api.flickr.com/services/rest/';

    var api_key = '4e5708f9ab5d15dfb115bcd109c21743';

    var photosData = $resource(publicPhotoBaseUrl, { method: 'flickr.photos.search', api_key: api_key, tag_mode: 'all', per_page: '20', extras: 'date_upload,owner_name', tags: 'potato', format: 'json', nojsoncallback: '1' }, {
        get: { method: 'GET',cache:true}
    });

    var photoDataById = $resource(publicPhotoBaseUrl, {
        method: 'flickr.photos.getInfo', api_key: api_key, format: 'json', nojsoncallback: '1'
    }, {
        get: { method: 'GET', cache: true }
    });

    //variable to maintain a count of the next page load
    flickrPhotoClass.pageToLoad = 2;

    //function to get photo list
    flickrPhotoClass.getPhotos = function (params, callback) { 
        return photosData.get(params, callback);
    }

    //function to get photo information by id
    flickrPhotoClass.getPhotoById = function (id, callback) {
        return photoDataById.get({ photo_id: id }, callback);
    }

    return flickrPhotoClass;


}]);



