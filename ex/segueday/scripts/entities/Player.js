(function (Ω) {

	"use strict";

	var Player = Ω.Entity.extend({

		w: 32,
		h: 32,
		dir: 1,
		speed: 4,

		sheet: new Ω.SpriteSheet("res/entities.png", 32, 48),

		init: function (start, screen) {

			this.screen = screen;

			this.x = start[0];
			this.y = start[1];

		},

		setMap: function (map) {

			this.map = map;

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

			if (xo !== 0 && yo !== 0) {
				xo /= Math.sqrt(2);
				yo /= Math.sqrt(2);
			}

			this.move(xo, yo, this.map);

		},

		hitBlocks: function (xBlocks, yBlocks) {

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


			this.sheet.render(gfx, frame, 0, this.x | 0, (this.y | 0) - 16);

		}

	});

	window.Player = Player;

}(Ω));
