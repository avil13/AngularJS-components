APP.directive('scrollup', function($document) {
    return {
        restrict: 'AС',
        link: function(scope, elm, attrs) {
            elm.bind("click", function() {

                function scrollToTop(element, to, duration) {
                    if (duration < 0) return;
                    var difference = to - element.scrollTop;
                    var perTick = difference / duration * 10;

                    setTimeout(function() {
                        element.scrollTop = element.scrollTop + perTick;
                        scrollToTop(element, to, duration - 10);
                    }, 10);
                }

                // then just add dependency and call it
                scrollToTop($document[0].body, 0, 400);
            });
        }
    };
});