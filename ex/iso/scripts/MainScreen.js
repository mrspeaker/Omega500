(function (Ω) {

	"use strict";

	var MainScreen = Ω.Screen.extend({

		sheet: new Ω.SpriteSheet("res/minecraft.png", 128),

		init: function () {

			this.camera = new Ω.Camera(0, 0, Ω.env.w, Ω.env.h);
			this.camera.zoom = 0.5;
			this.map = new Ω.Map(this.sheet, [
				[0, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 0, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 0, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 2, 2, 1, 1, 1, 1],
				[1, 1, 2, 2, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1]
			]);

		},

		tick: function (d) {

			if (Ω.input.pressed("escape")) {
				game.setScreen(new TitleScreen());
			}

			this.camera.zoom = Math.sin(Date.now() /1000) * 0.25 + 0.75;

		},

		render: function (gfx) {

			var c = gfx.ctx,
				title = "Ω500: iso main'";

			c.fillStyle = "hsl(120, 40%, 30%)";
			c.fillRect(0, 0, gfx.w, gfx.h);

			this.camera.render(gfx, [
				this.map
			])


			/*this.sheet.render(gfx, 0, 0, 0, 0);
			this.sheet.render(gfx, 0, 0, 128, 0);
			this.sheet.render(gfx, 0, 0, 64, 32);
			this.sheet.render(gfx, 1, 0, 192, 32);
			this.sheet.render(gfx, 0, 0, 128, 64);*/

		}

	});

	window.MainScreen = MainScreen;

}(Ω));