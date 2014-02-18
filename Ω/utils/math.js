(function (Ω) {

    "use strict";

    // Todo: split up utils. move math stuff here

    var math = {

        ease: {

            linear: function (start, end, perc) {
                return (end - start) * perc + start;
            },

            inOutQuad: function (start, end, perc) {
                return start + ((end - start) / 2) *
                    (perc < 0.5 ? 2 * perc * perc : -2 * perc * (perc - 2) - 1);
            },

            bounce: function (start, end, perc) {
                var ts = perc * perc,
                    tc = ts * perc;
                return start + (end - start) *
                    (33 * tc * ts + -106 * ts * ts + 126 * tc + -67 * ts + 15 * perc);
            }

        }

    };

    Ω.math = math;

}(window.Ω));
