;(function () {
    'use strict';

    console.log('!!! app.js');

    angular.module('app', ['angular-meteor'])
        .controller('app', appController)
    ;

    function appController($scope, $log, $meteor, FileUpload) {
        $scope.upload = upload;
        $scope.takePhoto = takePhoto;
        $scope.url = url;
        var Images = FileUpload.Images;

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
}());
