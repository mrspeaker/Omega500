(function (Ω) {

	"use strict";

	var Spear = Weapon.extend({

		w: 30,
		h: 10,

		speed: 10,

		life: 100,

		init: function (x, y, dir) {

			this._super(x, y, dir);

		},

		tick: function (map) {

			var speed = this.speed * this.dir;

			//this.moveBy(speed, 0);
			this.move(speed, this.yo, map)

			if (this.life-- < 0) {
				this.remove = true;
			}

			return !(this.remove);

		}

	});

	window.Spear = Spear;

}(Ω));
