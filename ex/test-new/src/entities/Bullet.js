(function (Ω) {
    "use strict";

    var Bullet = Ω.Entity.extend({
        w: 24,
        h: 8,
        life: 150,
        dir: -1,

        init: function (x, y, dir) {
            this._super(x, y);
            this.dir = dir;
        },

        tick: function () {

            this.x += this.dir * 8;
            return --this.life > 0;

        },

        hit: function () {

            for (var i = 0; i < 5; i++) {
                this.add(new Smoke(this.x + Ω.utils.rand(-40, 40), this.y - 15 + Ω.utils.rand(-40, 40)));
            }

        }
    });

    window.Bullet = Bullet;

}(window.Ω));
