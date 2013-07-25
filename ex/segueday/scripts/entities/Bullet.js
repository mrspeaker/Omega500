(function (Ω) {

	"use strict";

	var Bullet = Ω.Entity.extend({

		w: 8,
		h: 8,
		dir: 1,
		speed: 10,

		init: function (start, dir) {

			this.dir = dir;

			this.x = start[0];
			this.y = start[1];

			var x = [0, this.speed / Math.sqrt(2), this.speed, this.speed / Math.sqrt(2) , 0, -(this.speed / Math.sqrt(2)), -this.speed, -(this.speed / Math.sqrt(2))],
				y = [-this.speed, -(this.speed / Math.sqrt(2)), 0, this.speed / Math.sqrt(2), this.speed, this.speed / Math.sqrt(2), 0, -(this.speed / Math.sqrt(2))];

			this.xSpeed = x[dir - 1];
			this.ySpeed = y[dir - 1];

		},

		tick: function () {

			var xo = 0,
				yo = 0;

			this.x += this.xSpeed;
			this.y += this.ySpeed;

			if (this.x > Ω.env.w) {
				return false;
			}

			return true;
		},


		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "#fff";
			c.fillRect(this.x, this.y, this.w, this.h);

		}

	});

	window.Bullet = Bullet;

}(Ω));
