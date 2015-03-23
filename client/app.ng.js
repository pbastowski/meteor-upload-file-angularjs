;(function () {
    'use strict';

    console.log('!!! app.js');

    angular.module('app', ['angular-meteor'])
        .controller('app', appController)
    ;

    function appController($scope, $log, FileUpload) {
        $scope.upload = FileUpload.uploadImg;
        $scope.url    = FileUpload.url;
        $scope.images = FileUpload.images;

        $scope.takePhoto = takePhoto;

        function takePhoto () {
            MeteorCamera.getPicture(callback);

            function callback(error, data) {
                if (error)
                    return $log.error('camera returned an error: ', error);

                FileUpload.uploadImg(data)
                    .then($scope.apply);
            }
        }

    }
}());
