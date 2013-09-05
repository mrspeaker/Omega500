(function (Ω) {

	"use strict";

	var Ghoul = Ω.Entity.extend({

		w: 15, //30,
		h: 22, //45,

		speed: 4 / 2,
		dir: 1,

		tick: function (map) {

			this.x += this.speed * this.dir;
			this.y += Math.sin(Ω.utils.now() / 100)

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