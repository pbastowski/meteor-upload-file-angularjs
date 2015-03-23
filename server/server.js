Images = new FS.Collection('images', {
    //stores: [new FS.Store.FileSystem("images", {path: "../../../../../.uploads"})]
    stores: [new FS.Store.GridFS('images')]
});

Meteor.startup(function () {
    // code to run on server at startup
});
