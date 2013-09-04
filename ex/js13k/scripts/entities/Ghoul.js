(function (Ω) {

	"use strict";

	var Ghoul = Ω.Entity.extend({

		w: 30,
		h: 45,

		speed: 4,
		dir: 1,

		tick: function (map) {

			this.x += this.speed * this.dir;
			this.y += Math.sin(Ω.utils.now() / 100)

			return !(this.remove);

		}

	});

	window.Ghoul = Ghoul;

}(Ω));