(function (Ω) {

	"use strict";

	var Teleporter = Ω.Entity.extend({

		w: 32,
		h: 32,

		init: function (x, y, moveX, moveY) {

			this.x = x * this.w;
			this.y = y * this.h;
			this.moveX = moveX * this.w;
			this.moveY = moveY * this.h;

		},

		render: function (gfx) {
			gfx.ctx.fillStyle = "rgba(0,0,0,0.4)";
			gfx.ctx.fillRect(this.x, this.y, this.w, this.h);
		},

		hit: function (e) {

			e.x += this.moveX;
			e.y += this.moveY;

		}

	});

	window.Teleporter = Teleporter;

}(Ω));