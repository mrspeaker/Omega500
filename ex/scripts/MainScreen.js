(function (Ω) {

	"use strict";

	var MainScreen = Ω.Screen.extend({

		players: [],
		sheet: new Ω.SpriteSheet("res/tiles.png", 32),

		init: function () {

			var i;

			this.players = [new Player(Ω.env.w / 2, "hsl(20, 90%, 20%)")];

			for (i = 1; i < 10; i++) {
				this.players.push(new Player(-(i * 30)));
			}

		},

		tick: function (d) {

			if (Ω.input.isDown("left")) {
				this.players[0].x -= 5;
			}
			if (Ω.input.isDown("right")) {
				this.players[0].x += 5;
			}

			this.players.forEach(function (p, i) {

				if (i === 0) { return }

				p.tick(d);

				if (p.x > Ω.env.w) {
					p.x = -20;
				}

			});

			if (Ω.input.pressed("escape")) {
				game.setScreen(new TitleScreen());
			}

		},

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "hsl(195, 40%, 50%)";
			c.fillRect(0, 0, gfx.w, gfx.h);

			this.players.forEach(function (p) {

				p.render(gfx);

			});

			for (var i = 0; i < gfx.w / this.sheet.w; i++) {
				this.sheet.drawTile(gfx, 0, 0, i * this.sheet.w, 100);
				this.sheet.drawTile(gfx, 15, 0, i * this.sheet.w, 100 + this.sheet.h);
			}
		}
	});

	window.MainScreen = MainScreen;

}(Ω));
