(function (Ω) {

	"use strict";

	var DoorTrigger = Ω.Entity.extend({

		w: 32,
		h: 32,

		init: function (x, y) {

			this.x = x * this.w;
			this.y = y * this.h;

		},

		render: function (gfx) {
			gfx.ctx.fillStyle = "rgba(0,0,0,0.4)";
			gfx.ctx.fillRect(this.x, this.y, this.w, this.h);
		},

		hit: function (e) {

			if (e.isPlayer) {

			}

		}

	});

	window.DoorTrigger = DoorTrigger;

}(Ω));