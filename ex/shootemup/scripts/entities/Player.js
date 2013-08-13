(function (Ω) {

	"use strict";

	var Player = Ω.Entity.extend({

		w: 28,
		h: 28,
		dir: 1,
		speed: 4,

		bullets: null,
		fireTime: 0,

		sheet: new Ω.SpriteSheet("res/entities.png", 32, 48),

		init: function (start, screen) {

			this.screen = screen;

			this.bullets = [];

			this.x = start[0];
			this.y = start[1];

		},

		setMap: function (map) {

			this.map = map;

		},

		hit: function (by) {

			if (by instanceof Car) {
				this.screen.killed();
			}

		},

		tick: function () {

			var xo = 0,
				yo = 0;

			if (Ω.input.isDown("left")) {
				xo -= this.speed;
				this.dir = 7;
			}
			if (Ω.input.isDown("right")) {
				xo += this.speed;
				this.dir = 3;
			}
			if (Ω.input.isDown("up")) {
				yo -= this.speed;
				this.dir = this.dir === 7 ? 8 : this.dir === 3 ? 2 : 1;
			}
			if (Ω.input.isDown("down")) {
				yo += this.speed;
				this.dir = this.dir === 7 ? 6 : this.dir === 3 ? 4 : 5;
			}

			this.fireTime--;
			if (Ω.input.isDown("space")) {
				if (this.fireTime < 0) {
					this.bullets.push(
						new Bullet([this.x + this.w / 2 - 3, this.y + 5], this.dir, this.map)
					)
					this.fireTime = 5;
				}
			} else if (Ω.input.isDown("launch")) {
				if (this.fireTime < 0) {
					this.bullets.push(
						new Grenade([this.x + this.w / 2 - 3, this.y + 5], this.dir, this.map)
					)
					this.fireTime = 5;
				}
			}

			// Slow down if moving diagonally
			if (xo !== 0 && yo !== 0) {
				xo /= Math.sqrt(2);
				yo /= Math.sqrt(2);
			}

			this.bullets = this.bullets.filter(function (b) {
				return b.tick();
			});

			this.move(xo, yo, this.map);

		},

		render: function (gfx) {

			var frame = 0;
			switch (this.dir) {
				case 1:
				case 2:
				case 8:
					frame = (Ω.utils.now() / 200 | 0) % 2;
					break;
				case 5:
				case 4:
				case 6:
					frame = 6 + ((Ω.utils.now() / 200 | 0) % 2);
					break;
				case 3:
					frame = 4;
					break;
				case 7:
					frame = 2;
					break;
			}

			this.bullets.map(function (b) {

				b.render(gfx);

			});

			this.sheet.render(gfx, frame, 0, this.x - 2, this.y - 20);

		}

	});

	window.Player = Player;

}(Ω));
