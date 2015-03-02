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


APP.filter('pager', function() {
    return function(arr, current, count) {

        var center = Math.ceil(count / 2),
            end = current + center,
            start = current - center;

        if (start < 0) {
            end -= start;
            start = 0;
        }

        return (arr || []).slice(start, end);
    };
});
