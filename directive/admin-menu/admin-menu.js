APP.directive('adminMenu', [
    function() {
        return {
            restrict: 'E',
            templateUrl: '/admin-menu.html',
            replace: true,
            transclude: true,
            controller: 'MenuCtrl'
        };
    }
]);
