(function (Ω) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        init: function () {

            this.player = new Player(Ω.env.w * 0.5, Ω.env.h * 0.2);

        },

        tick: function () {

            this.player.tick();
        },

        render: function (gfx) {

            this.clear(gfx, "hsl(195, 40%, 40%)");
            this.player.render(gfx);

        }
    });

    window.MainScreen = MainScreen;

}(window.Ω));
