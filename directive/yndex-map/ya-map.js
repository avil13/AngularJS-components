APP.directive('yaMap', [
    function() {
        return {
            restrict: 'E',
            templateUrl: '/ya-map.html',
            scope: {
                coordinate: '='
            },
            link: function(scope, element, attrs) {

                scope.equalCoord = function() {
                    scope.coordinate = scope.center;
                };

                var YaMap = element.children().children()[1].children[0],
                    cross = element.children().children()[1].children[1];

                // отображение координат в поле
                var showCoord = function(myMap) {
                    var cen = myMap.getCenter();
                    scope.center = cen.join(', ');
                    scope.$apply();
                };

                // установка перекрестия по середине
                var setCross = function(myMap, cross) {
                    var size = myMap.container.getSize();
                    cross.style.left = size[0] / 2 - 14 + 'px';
                    cross.style.top = size[1] / 2 + 22 + 'px';
                    showCoord(myMap);
                };

                ymaps.ready(function() {
                    // если есть уже координаты то выставим их
                    var coord = scope.coordinate ? scope.coordinate.split(',') : [],
                        center = [55.72504493, 37.64696100];

                    if (coord && coord.length === 2) {
                        coord[0] = parseFloat(coord[0]);
                        coord[1] = parseFloat(coord[1]);
                        center = coord;
                    }

                    // создание карты
                    var myMap = new ymaps.Map(YaMap, {
                        center: center,
                        zoom: 18
                    });

                    setCross(myMap, cross);

                    myMap.events.add(['resultselect', 'boundschange'], function(e) {
                        setCross(myMap, cross);
                    });
                });
            }
        };
    }
]);