(function (Ω) {

    "use strict";

    var Player = Ω.Entity.extend({
        w: 24,
        h: 32,
        speed: 4,

        init: function (x, y, map) {

            this._super(x, y);
            this.map = map;

        },

        tick: function () {

            var xo = 0,
                yo = 0;

            if (Ω.input.isDown("left")) { xo -= this.speed; }
            if (Ω.input.isDown("right")) { xo += this.speed; }
            if (Ω.input.isDown("up")) { yo -= this.speed; }
            if (Ω.input.isDown("down")) { yo += this.speed; }
            if (Ω.input.pressed("space")) {
                this.add(
                    new Bullet(this.x + 10, this.y + 5, xo < 0 ? -1 : 1),
                    "player-bullet"
                );
            }

            this.move(xo, yo, this.map);

            return true;
        },

        render: function (gfx) {

            var c = gfx.ctx;

            c.fillStyle = "#333";
            c.fillRect(this.x, this.y, this.w, this.h);

        },

        hit: function () {

            this.x = Ω.env.w / 2;
            this.y = Ω.env.h / 2;

        }

    });

    window.Player = Player;

}(window.Ω));
