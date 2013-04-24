(function (Ω) {

	"use strict";

	var Shake = Ω.Class.extend({

		init: function (time) {

			this.time = time || 10;

		},

		tick: function () {

			return this.time--;

		},

		render: function (gfx, x, y) {

			gfx.ctx.translate(Math.random() * 8, Math.random() * 4);

		}

	});

	Ω.Shake = Shake;

}(Ω));
