(function (Ω) {

	"use strict";

	var Weapon = Ω.Entity.extend({

		speed: 8,
		dir: -1,

		init: function (x, y, dir) {

			this._super(x, y);
			this.dir = dir;

		},

		tick: function () { return true; },

		hit: function (e) {

			e.remove = true;
			this.remove = true;

		}

	});

	window.Weapon = Weapon;

}(Ω));
