APP.directive('datePiker', [function() {
    return {
        restrict: 'EA',
        templateUrl: 'datepiker.html',
        scope: {
            currDate: '=date', // Date()
            firstDay: '@'
        },
        link: function(scope, iElement, iAttrs) {

            scope.formatDate = function(date) {
                if (!date) return false;
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(1);
                return date;
            };

            scope.currDate = scope.formatDate(scope.currDate) || scope.formatDate(new Date());

            if (scope.firstDay === undefined) {
                scope.firstDay = 1;
            } else {
                scope.firstDay = parseInt(scope.firstDay, 10);
            }

            scope.typeView = false;

            var getWeeks = function() {
                var date = new Date(scope.currDate.getTime());

                var startMonth = date.getMonth(),
                    startYear = date.getFullYear();
                date.setDate(1);
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(1);

                if (date.getDay() === 0) {
                    date.setDate(-5);
                } else {
                    date.setDate(date.getDate() - (date.getDay() - scope.firstDay));
                }
                if (date.getDate() === 1) {
                    date.setDate(scope.firstDay - 7);
                }

                var weeks = [];
                var week = [];
                while (weeks.length < 6) {
                    if (date.getFullYear() === startYear && date.getMonth() > startMonth) break;
                    week = [];
                    for (var i = 0; i < 7; i++) {
                        week.push({
                            d: new Date(date)
                        });
                        date.setDate(date.getDate() + 1);
                    }
                    weeks.push(week);
                }

                return weeks;
            };

            var getDaysOfWeek = function(date) {
                date = new Date(date || new Date());
                date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                date.setDate(date.getDate() - (date.getDay() - scope.firstDay));
                var days = [];
                for (var i = 0; i < 7; i++) {
                    days.push(new Date(date));
                    date.setDate(date.getDate() + 1);
                }
                return days;
            };

            scope.next = function(delta) {
                delta = delta || 1;

                var month = scope.currDate.getMonth() + delta;

                scope.currDate.setMonth(month);
                scope.weeks = getWeeks();
            };

            scope.prev = function() {
                scope.next(-1);
            };

            scope.setDate = function(day) {
                if (day.d.getMonth() != scope.currDate.getMonth()) return false;
                scope.currDate = day.d;
                scope.typeView = false;
            };

            scope.changeView = function() {
                scope.typeView = true;
            };

            scope.weeks = getWeeks();
            scope.weekdays = getDaysOfWeek();
        }
    };
}]);