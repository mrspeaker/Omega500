(function (Ω) {

    "use strict";

    var Bird = Ω.Entity.extend({
        w: 30,
        h: 20,
        ac: 0,
        tick: function () {
            this.ac = Math.min(this.ac + 0.4, 10);
            this.y += this.ac;

            if (Ω.input.pressed("jump")) {
                this.ac = -8;
            }

            if (this.y > Ω.env.h - 20) {
                window.game.setScreen(new window.GameOverScreen());
            }

        }
    });

    window.Bird = Bird;

}(window.Ω));