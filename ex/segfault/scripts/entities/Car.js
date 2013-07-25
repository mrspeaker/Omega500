(function (Ω) {

	"use strict";

	var Car = Ω.Entity.extend({

		w: 44,
		h: 48 * 2,

		dir: 1,
		speed: Math.random() * 5 + 2,

		remove: false,


		sheet: new Ω.SpriteSheet("res/entities.png", 32, 48),

		init: function (start, dir, map) {

			this.map = map;

			this.dir = dir;

			this.x = start[0];
			this.y = start[1];

			this.setDir(dir);

		},

		setDir: function (dir) {

			if (!dir) {
				dir = (Math.random() * 7 | 0 ) + 1;
			}

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

			if (this.y < 0 || this.y > this.map.h) {
				this.remove = true;
			}

			return !(this.remove);

		},

		render: function (gfx) {

			var c = gfx.ctx;

			this.sheet.render(gfx, 0, 3, this.x - 10, this.y);
			this.sheet.render(gfx, 1, 3, this.x + 32 - 10, this.y);
			this.sheet.render(gfx, 0, 4, this.x - 10, this.y + 48);
			this.sheet.render(gfx, 1, 4, this.x + 32 - 10, this.y + 48);

		}

	});

	window.Car = Car;

}(Ω));
