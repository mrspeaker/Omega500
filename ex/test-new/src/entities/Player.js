(function (Ω) {

    "use strict";

    var Player = Ω.Entity.extend({
        w: 24,
        h: 32,

        tick: function () {

            this.y += Math.sin(Ω.utils.now() / 140) * 2;

            if (Ω.input.isDown("left")) { this.x -= 3; }
            if (Ω.input.isDown("right")) { this.x += 3; }
            if (Ω.input.isDown("up")) { this.y -= 3; }
            if (Ω.input.isDown("down")) { this.y += 3; }

            if (Ω.input.pressed("space")) {
                this.add(new Bullet(this.x + 10, this.y + 5), "player-bullet");
            }

            return true;
        },

        render: function (gfx) {

            var c = gfx.ctx;
            c.fillStyle = "#333";
            c.fillRect(this.x, this.y, this.w, this.h);
        },

        hit: function (b) {
            this.x = Ω.env.w / 2;
            this.y = Ω.env.h / 2;
        }

    });

    window.Player = Player;

}(window.Ω));