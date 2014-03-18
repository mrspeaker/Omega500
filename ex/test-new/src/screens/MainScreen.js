(function (Ω) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        init: function () {

            var map = this.add(
                new Ω.DebugMap(80, 80, 8, 2, [
                    [1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,2,2,2,2,0,2,2,2,2,0,1],
                    [1,0,2,0,0,0,0,0,0,0,2,0,1],
                    [1,0,2,0,3,0,5,4,3,0,2,0,1],
                    [1,0,2,0,4,0,0,0,4,0,0,0,1],
                    [1,0,2,0,4,4,4,0,4,0,2,0,1],
                    [1,0,2,0,0,0,0,0,0,0,2,0,1],
                    [1,0,2,0,2,2,2,2,2,2,2,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1]
                ], 0, 6),
                "map", 1 // Add to "map" group with zIndex 1
            );

            this.player = this.add(new Player(Ω.env.w * 0.5, Ω.env.h * 0.2, map));
            this.camera = new Ω.Camera(0, 0, Ω.env.w, Ω.env.h);

        },

        tick: function () {

            // Randomly add a bad guy
            if (Ω.utils.oneIn(100)) {
                this.add(
                    new Baddie(this.player.x + (Ω.env.w / 2), Ω.utils.rand(0, Ω.env.h) | 0),
                    "baddies" // Add to "baddies" group
                );
            }

            Ω.Physics.checkCollisions([this.get("baddies"), this.get("player-bullet")]);
            Ω.Physics.checkCollision(this.player, this.get("baddies"));

            // Center camera on player
            this.camera.moveTo(
                this.player.x - (Ω.env.w / 2),
                this.player.y - (Ω.env.h / 2)
            );

        },

        render: function (gfx) {

            this.clear(gfx, "hsl(195, 40%, 5%)");

        }
    });

    window.MainScreen = MainScreen;

}(window.Ω));
