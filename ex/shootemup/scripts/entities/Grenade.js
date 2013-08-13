(function (Ω) {

	"use strict";

	var Grenade = Ω.Entity.extend({

		w: 8,
		h: 8,
		dir: 1,
		speed: 10,

		remove: false,

		init: function (start, dir, map) {

			this.dir = dir;
			this.map = map;

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

			if (this.x > this.map.w || this.x < 0 || this.y < 0 || this.y > this.map.h) {
				return false;
			}

			return !(this.remove);
		},

		hit: function (by) {

			this.remove = true;

		},

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "red";
			c.strokeStyle = "#fff";
			c.beginPath();
			c.arc(this.x, this.y, 5, 0, Math.PI * 2, true)
			c.stroke();
			c.fill();

		}

	});

	window.Grenade = Grenade;

}(Ω));
