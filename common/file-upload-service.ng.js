/**
 * FileUpload service
 */
;(function(){

    console.log('!!! file-upload-service');

    var Images = new FS.Collection('images', {
        //stores: [new FS.Store.FileSystem("images", {path: "../../../../../.uploads"})]
        stores: [new FS.Store.GridFS('images')]
    });

    if ( Meteor.isClient ) {

        // Add the FileUpload service for the Client
        angular.module('app')
            .factory('FileUpload', fileUpload);

        function fileUpload($meteor, $log, $q) {
            return {
                images:    $meteor.collection(function () { return Images.find() }),
                url:       url,
                uploadImg: uploadImg
            };

            function url(image) {
                return Images.findOne(image._id).url();
            }

            function uploadImg(el) {
                if (el instanceof HTMLElement)
                    var data = el.files[0];
                else if (el instanceof jQuery.Event)
                    data = el.target.files[0];
                else
                    data = el;

                var d = $q.defer();
                Images.insert(data, function (err, fileObj) {
                    $log.debug('insert: ', fileObj);
                    d.resolve();
                });

                return d.promise;
            }
        }

    }

}());

