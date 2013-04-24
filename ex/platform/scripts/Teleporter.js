(function (Ω) {

	"use strict";

	var Teleporter = Ω.Entity.extend({

		w: 32,
		h: 32,

		init: function (x, y, moveX, moveY) {

			this.splat = new Ω.Particle({});
			this.x = x * this.w;
			this.y = y * this.h;
			this.moveX = moveX * this.w;
			this.moveY = moveY * this.h;

		},

		tick: function (d) {
			this.splat.tick(d);
		},

		render: function (gfx) {
			gfx.ctx.fillStyle = "rgba(0,0,0,0.4)";
			gfx.ctx.fillRect(this.x, this.y, this.w, this.h);
			this.splat.render(gfx);
		},

		hit: function (e) {

			e.x += this.moveX;
			e.y += this.moveY;

			this.splat.play(this.x + this.w / 2, this.y + this.h / 2);

			Ω.timer(3, function () {

				e.particle && e.particle.play(e.x + e.w / 2, e.y + e.h / 2);

			});

		}

	});

	window.Teleporter = Teleporter;

}(Ω));