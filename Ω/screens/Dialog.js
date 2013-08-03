(function (Ω) {

	"use strict";

	var Dialog = Ω.Class.extend({

		killKey: "escape",
		time: 0,

		init: function (key) {

			if (key) {
				this.killKey = key;
			}

		},

		tick: function (delta) {

			this.time += delta;

			if (this.killKey && Ω.input.pressed(this.killKey)) {
				Ω.input.release(this.killKey);
				this.done();
			}

		},

		done: function () {

			game.clearDialog();

		},

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "rgba(0, 0, 0, 0.7)";
			c.fillRect(gfx.w * 0.15, gfx.h * 0.25, gfx.w * 0.7, gfx.h * 0.5);

		}

	});

	Ω.Dialog = Dialog;

}(Ω));
