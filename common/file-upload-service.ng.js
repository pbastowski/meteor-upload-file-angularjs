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
        angular.module('app')
            .factory('FileUpload', fileUpload);

        function fileUpload() {
            return {
                Images: Images
            }
        }
    }

}());

