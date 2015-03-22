//;(function () {
//    'use strict'

    console.log('!!! app.js');

    window.Images = new FS.Collection('images', {
        //stores: [new FS.Store.FileSystem("images", {path: "../../../../../.uploads"})]
        //stores: [new FS.Store.FileSystem("images", {path: "../../../../../server/uploads"})]
        //stores: [new FS.Store.FileSystem("images", {path: "./uploads"})]
        stores: [new FS.Store.GridFS('images')]
    });


    angular.module('app', ['angular-meteor'])

        .controller('app', appController)
    ;
        //.directive('fileModel', fileModelDirective)

    //angular.component('test', '<button>This is a test</button>');

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
        $log.debug('directive fileModel');
        return {
            restrict: 'A',
            scope:    {fileModel: '=', onSelect: '&'},
            link:     link
        }

        function link(scope, el, attrs) {
            el.bind('change', function (evt) {
                scope.$apply(function () {
                    if (!scope.$parent.IE789) {
                        scope.fileModel = evt.target.files;
                        if (scope.onSelect && scope.onSelect != '') {
                            //$log.log('File(s): ', evt.target.files);
                            scope.onSelect({'$event': evt});
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

    function appController($scope, $log, $meteor) {
        $scope.upload = upload;
        $scope.files = {};
        $scope.images = $meteor.collection(function () {
            return Images.find()
        });
        $scope.vm = {cameraImg: ''};


        $scope.url = function (image) {
            return Images.findOne(image._id).url();
        };

        $scope.takePhoto = function () {
            MeteorCamera.getPicture(callback);

            function callback(error, data) {
                if (error)
                    $log.error('camera returned an error: ', error);

                $scope.vm.cameraImg = data;
                $scope.$apply();

                Images.insert(data, function (err, fileObj) {
                    // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                    $log.debug('insert: ', err, fileObj);
                });

            }
        }

        /**
         * Upload the passed in file(s) to the server.
         *
         * @param ev  either an input[type=file] element or the change event on that element
         */
        function upload(ev) {
            $log.debug('upload: ', ev.files, ev.target); //, ev.target.files);

            var el = ev.target || ev;

            Images.insert(el.files[0], function (err, fileObj) {
                // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                $log.debug('insert: ', err, fileObj);
            });

            $scope.$apply();
        }
    }
//})
