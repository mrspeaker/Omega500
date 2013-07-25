(function (Ω) {

	"use strict";

	var BusinessMan = Ω.Entity.extend({

		w: 32,
		h: 32,
		dir: 1,
		speed: 2,

		life: 400,
		remove: false,

		state: null,

		sheet: new Ω.SpriteSheet("res/entities.png", 32, 48),

		init: function (start, dir, map) {

			this.map = map;

			this.dir = dir;

			this.x = start[0];
			this.y = start[1];

			this.setDir(dir);

			this.state = new Ω.utils.State("RUNNING");

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

			this.state.tick();

			var remove = false;

			switch (this.state.get()) {
			case "RUNNING":
				remove = !(this.tick_RUNNING());
				break;
			case "DYING":
				if (this.state.count > 40) {
					this.state.set("DEAD");
				}
				break;
			case "DEAD":
				remove = true;
				break;
			}

			return !remove;

		},

		tick_RUNNING: function () {

			var xo = 0,
				yo = 0;

			this.x += this.xSpeed;
			this.y += this.ySpeed;

			if (this.x < 0 || this.y < 0) {
				this.setDir();
			}

			if (this.x > this.map.w || this.y > this.map.h) {
				this.remove = true;
			}

			return !(this.remove);

		},

		hit: function (by) {

			if (by instanceof Bullet) {

				if (this.state.is("RUNNING")) {
					this.state.set("DYING");
				}

			}

		},

		hitSegue: function () {

			if (this.state.is("RUNNING")) {
				this.state.set("DYING");
			}

		},

		render: function (gfx) {

			var c = gfx.ctx,
				xf = 0,
				yf = 0;

			if (this.state.is("RUNNING")) {
				xf = (Ω.utils.now() / 200 | 0) % 2;
				yf = 1
			} else {
				xf = 0;
				yf = 2;
			}


			this.sheet.render(gfx, xf, yf, this.x, this.y);

		}

	});

	window.BusinessMan = BusinessMan;

}(Ω));
