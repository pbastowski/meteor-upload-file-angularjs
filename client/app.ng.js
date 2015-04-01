;(function () {
    'use strict';

    console.log('!!! app.js');

    angular.module('app', ['angular-meteor'])
        .controller('app', appController)
        .directive('fileModel', fileModelDirective)
    ;

    function appController($scope, $log, FileUpload) {
        console.log('! app controller');

        $scope.upload = FileUpload.uploadImg;
        $scope.url    = FileUpload.url;
        $scope.images = FileUpload.images;

        $scope.takePhoto = takePhoto;

        function takePhoto () {
            MeteorCamera.getPicture(callback);

            function callback(error, data) {
                if (error)
                    return $log.error('camera returned an error: ', error);

                FileUpload.uploadImg(data);
                    //.then($scope.apply);
            }
        }

    }

    /**
     * file-model (directive) - attribute only
     *
     * The ngModel directive does not support input[type=file]. fileModel does.
     *
     * Usage: <input type="file" file-model="file.object">
     *
     * The file object returned by the input control will be stored in $scope.file.object.
     */
    function fileModelDirective($log) {
        console.log('directive fileModelDirective');

        $log.debug('directive fileModel');
        return {
            restrict: 'A',
            scope:    { fileModel: '&' },
            link:     link
        }

        function link(scope, el, attrs) {
            el.bind('change', function (evt) {
                scope.$apply(function () {
                    if (!scope.$parent.IE789) {
                        if (scope.fileModel && scope.fileModel != '') {
                            scope.fileModel({'$event': evt});
                        }
                        //else {
                        //	scope.fileModel = evt.target.value;
                        //}

                        //$log.debug("fileModel change: ", scope.fileModel);
                    }
                });
            })
        }
    }
}());
