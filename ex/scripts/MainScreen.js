(function (Ω) {

	"use strict";

	var MainScreen = Ω.Screen.extend({

		players: [],
		sheet: new Ω.SpriteSheet("res/tiles.png", 32),
		bg: new Ω.Image("res/background.png"),

		init: function () {

			var i;

			this.players = [new Player(Ω.env.w / 2, true)];

			for (i = 1; i < 6; i++) {
				//this.players.push(new Player(-(i * 40)));
			}

		},

		tick: function (d) {

			this.players.forEach(function (p, i) {

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

			this.bg.draw(gfx, -this.players[0].x / 20 - 20, 0);

			this.players.forEach(function (p) {

				p.render(gfx);

			});

			for (var i = 0; i < gfx.w / this.sheet.w; i++) {
				this.sheet.draw(gfx, 0, 0, i * this.sheet.w, 100);
				this.sheet.draw(gfx, 15, 0, i * this.sheet.w, 100 + this.sheet.h);
			}

			c.font = "7pt MonoSpace";
			c.fillStyle = "#fff"
			c.fillText("[esc]", 2, 10);
		}
	});

	window.MainScreen = MainScreen;

}(Ω));
