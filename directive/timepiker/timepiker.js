APP.directive('timePiker', [function() {
    return {
        restrict: 'E',
        templateUrl: 'timepiker.html',
        scope: {
            currDate: '=time', // Date()
        },
        link: function(scope, iElement, iAttrs) {
            scope.typeView = false;
            scope.t = {};

            var int = function(str) {
                str += '';
                return parseInt(str.replace(/\D+/g, ""), 10);
            };

            var hm = function() {
                scope.t.hour = scope.currDate.getHours();
                scope.t.minutes = scope.currDate.getMinutes();
            };
            hm();

            scope.upd = function() {
                scope.t.minutes = int(scope.t.minutes);
                scope.t.hour = int(scope.t.hour);
                if (isNaN(scope.t.minutes) || isNaN(scope.t.hour)) {
                    return false;
                }
                scope.currDate.setMinutes(scope.t.minutes);
                scope.currDate.setHours(scope.t.hour);
                hm();
            };

            scope.action = function(type, operator) {
                var op = operator ? 1 : -1;
                if (type === 'm') {
                    scope.currDate.setMinutes(scope.currDate.getMinutes() + op);
                }
                if (type === 'h') {
                    scope.currDate.setHours(scope.currDate.getHours() + op);
                }
                hm();
            };

            scope.changeView = function() {
                scope.typeView = !scope.typeView;
            };
        }
    };
}]);