//;(function () {

    console.log('!!! component.js - start');

    angular.component = function angularComponent(component, template, scope, controller) {
        var module = component.split('.');
        if (module.length > 1) {
            component = module[1];
            module = module[0];
        }
        else
            module = 'app';

        angular.module(module).directive(component, function () {
            return {
                controllerAs: component,
                scope:        scope,
                template:     template,
                controller:   controller
            };
        });

    };

    console.log('!!! component.js - end');


//}());
