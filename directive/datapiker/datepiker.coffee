APP.directive 'datePiker', [
    ->
        restrict: 'EA'
        templateUrl: 'datepiker.html'
        scope:
            date: '=', # Date()
            firstDay: '@', # 1
            max: '=', # Date()
            min: '=' # Date()
        link: (scope, iElement, iAttrs)->
            scope.formatDate = (date)->
                if !date then return false
                date.setHours(0)
                date.setMinutes(0)
                date.setSeconds(0)
                date.setMilliseconds(1)
                return date

            scope.currDate = scope.formatDate(angular.copy(scope.date))

            if scope.firstDay == undefined
                scope.firstDay = 1
            else
                scope.firstDay = parseInt(scope.firstDay, 10)

            scope.typeView = false

            getWeeks = ->
                date = new Date(scope.currDate.getTime())

                startMonth = date.getMonth()
                startYear = date.getFullYear()
                date.setDate(1)
                date.setHours(0)
                date.setMinutes(0)
                date.setSeconds(0)
                date.setMilliseconds(1)

                if date.getDay() == 0
                    date.setDate(scope.firstDay - 6)
                else
                    date.setDate(date.getDate() - (date.getDay() - scope.firstDay))

                if date.getDate() == 1
                    date.setDate(scope.firstDay - 7)

                weeks = []
                week = []
                while weeks.length < 6
                    if date.getFullYear() == startYear && date.getMonth() > startMonth
                        break
                    week = []
                    i = 0
                    while(i < 7)
                        i++
                        week.push({
                            d: new Date(date)
                        })
                        date.setDate(date.getDate() + 1)

                    weeks.push(week)
                return weeks


            getDaysOfWeek = (date)->
                date = new Date(date || new Date())
                date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
                date.setDate(date.getDate() - (date.getDay() - scope.firstDay))
                days = []
                i = 0
                while i < 7
                    i++
                    days.push(new Date(date))
                    date.setDate(date.getDate() + 1)
                return days;

            scope.next = (delta)->
                delta = delta || 1
                month = scope.currDate.getMonth() + delta
                scope.currDate.setMonth(month)
                scope.weeks = getWeeks()

            scope.prev = ->
                scope.next(-1)

            scope.chekDate = (day, type) ->
                max = false
                min = false
                klass = []
                muted = undefined
                cd = scope.currDate
                d = day.d
                if scope.max
                    max = d.getFullYear() > scope.max.getFullYear() or d.getMonth() > scope.max.getMonth() and d.getFullYear() >= scope.max.getFullYear() or d.getDate() > scope.max.getDate() and d.getMonth() >= scope.max.getMonth() and d.getFullYear() >= scope.max.getFullYear()
                if scope.min
                    min = d.getFullYear() < scope.max.getFullYear() or d.getMonth() < scope.min.getMonth() and d.getFullYear() <= scope.min.getFullYear() or d.getDate() < scope.min.getDate() and d.getMonth() <= scope.min.getMonth() and d.getFullYear() <= scope.min.getFullYear()
                    muted = min or max or d.getMonth() != cd.getMonth()
                if type
                    return muted
                if muted
                    klass.push 'text-muted'
                if d.getDate() == cd.getDate() and d.getMonth() == cd.getMonth() and d.getFullYear() == cd.getFullYear()
                    klass.push 'bg-primary'
                klass.join ' '

            scope.setDate = (day) ->
                if scope.chekDate(day, true)
                  return false
                scope.date.setDate day.d.getDate()
                scope.date.setMonth day.d.getMonth()
                scope.date.setFullYear day.d.getFullYear()
                scope.currDate.setDate day.d.getDate()
                scope.currDate.setMonth day.d.getMonth()
                scope.currDate.setFullYear day.d.getFullYear()
                scope.typeView = false
                return

              scope.changeView = ->
                scope.typeView = true
                return

            scope.weeks = getWeeks()
            scope.weekdays = getDaysOfWeek()
            return
]