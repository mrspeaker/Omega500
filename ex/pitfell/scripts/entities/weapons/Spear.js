(function (Ω) {

	"use strict";

	var Spear = Weapon.extend({

		w: 20,//40,
		h: 4,//8,

		speed: 10,

		life: 200,

		init: function (x, y, dir) {

			this._super(x, y, dir);

		},

		tick: function (map) {


			if (!this.stuck) {
				var speed = this.speed * this.dir,
					moved = this.move(speed, this.yo, map);
				if (moved[0] === 0) {
					this.stuck = true;
				}
			}

			if (this.life-- < 0) {
				this.remove = true;
			}

			return !(this.remove);

		},

		hit: function (e) {

			if (!(e instanceof Spear)) {
				//e.remove = true;
				this.remove = true;
			} else {
				//e.stuck = true;
				this.stuck = true;
			}

		},


		hitSpear: function () {}


	});

	window.Spear = Spear;

}(Ω));
