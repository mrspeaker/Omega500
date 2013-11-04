(function (Ω) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        init: function () {

        },

        tick: function () {

        },

        render: function (gfx) {

            var c = gfx.ctx;

            this.clear(gfx, "hsl(195, 40%, 50%)");

        }
    });

    window.MainScreen = MainScreen;

}(Ω));
