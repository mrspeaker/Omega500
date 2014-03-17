(function (Ω) {
    "use strict";

    var Bullet = Ω.Entity.extend({
        w: 24,
        h: 8,
        life: 150,

        tick: function () {

            this.x += 5;
            return --this.life > 0;

        },

        hit: function () {

            for (var i = 0; i < 5; i++) {
                this.add(new Smoke(this.x + 15 + Ω.utils.rand(-40, 40), this.y - 15 + Ω.utils.rand(-40, 40)));
            }

        }
    });

    window.Bullet = Bullet;

}(window.Ω));
