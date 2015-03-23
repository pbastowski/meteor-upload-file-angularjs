//;(function () {
//    'use strict'

    console.log('!!! app.js');

    window.Images = new FS.Collection('images', {
        //stores: [new FS.Store.FileSystem("images", {path: "../../../../../.uploads"})]
        stores: [new FS.Store.GridFS('images')]
    });


    angular.module('app', ['angular-meteor'])
        .controller('app', appController)
    ;

    //angular.component('test', '<button>This is a test</button>');

    function appController($scope, $log, $meteor) {
        $scope.upload = upload;
        $scope.takePhoto = takePhoto;
        $scope.url = url;

        $scope.images = $meteor.collection(function () { return Images.find() });

        function url (image) {
            return Images.findOne(image._id).url();
        };

        function takePhoto () {
            MeteorCamera.getPicture(callback);

            function callback(error, data) {
                if (error)
                    return $log.error('camera returned an error: ', error);

                Images.insert(data, function (err, fileObj) {
                    $scope.$apply();
                    $log.debug('insert: ', err, fileObj);
                });

            }
        }

        function upload(el) {
            Images.insert(el.files[0], function (err, fileObj) {
                $log.debug('insert: ', fileObj);
            });
        }
    }
//})
