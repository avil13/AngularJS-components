APP.controller('MenuCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {

        $scope.menu = [{
            url: 'index',
            title: 'Главная'
        }, {
            url: 'contact',
            title: 'Контакты'
        }];

        $scope.hash = window.location.hash.toString().substr(2);
    }
]);