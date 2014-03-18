(function (Ω) {

    "use strict";

    var Baddie = Ω.Entity.extend({

        tick: function () {

            this.x -= 1;
            return this.x > -this.w;

        },

        hit: function () {

            this.remove = true;

        }

    });

    window.Baddie = Baddie;

}(window.Ω));
