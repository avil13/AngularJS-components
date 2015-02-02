APP.directive('formInput', [
    function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/form-input.html',
            scope: true
        };
    }
]);
