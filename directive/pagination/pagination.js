APP.directive('pagination', [
    function() {
        return {
            restrict: 'E',
            templateUrl: '/pagination.html',
            scope: {
                pages: '=',
                current: '=',
                fn: '=',
                count: '@'
            }
        };
    }
]);

