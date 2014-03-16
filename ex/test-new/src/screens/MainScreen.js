(function (Ω) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        init: function () {

            this.player = this.add(new Player(Ω.env.w * 0.5, Ω.env.h * 0.2));

        },

        tick: function () {

            if (Ω.utils.oneIn(100)) {
                this.add(new Baddie(Ω.env.w, Ω.utils.rand(0, Ω.env.h) | 0), "baddies");
            }

            Ω.Physics.checkCollisions([this.get("baddies"), this.get("player-bullet")]);
            Ω.Physics.checkCollision(this.player, this.get("baddies"));

        },

        render: function (gfx) {

            this.clear(gfx, "hsl(195, 40%, 40%)");

        }
    });

    window.MainScreen = MainScreen;

}(window.Ω));
