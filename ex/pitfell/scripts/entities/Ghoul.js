(function (Ω) {

	"use strict";

	var Ghoul = Ω.Entity.extend({

		w: 15,
		h: 22,

		speed: 4 / 2,
		dir: 1,
		life: 400,

		tick: function (map) {

			this.x += this.speed * this.dir;
			this.y += Math.sin(Ω.utils.now() / 100);

			if (this.life-- < 0) {
				this.remove = true;
			}

			return !(this.remove);

		},

		hit: function (e) {

			if (e instanceof Weapon && !e.stuck) {

				this.remove = true;

			}

		}

	});

	window.Ghoul = Ghoul;

}(Ω));