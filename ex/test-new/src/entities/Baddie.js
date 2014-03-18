(function (Ω) {

    "use strict";

    var Baddie = Ω.Entity.extend({

        tick: function () {

            this.x -= 1;
            return this.x > -this.w;

        },

        hit: function () {

            for (var i = 0; i < 5; i++) {
                this.add(
                    new Smoke(this.x + Ω.utils.rand(-40, 40), this.y - 15 + Ω.utils.rand(-40, 40))
                );
            }

            this.remove = true;

        }

    });

    window.Baddie = Baddie;

}(window.Ω));
