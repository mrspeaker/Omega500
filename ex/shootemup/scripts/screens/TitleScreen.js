(function (Ω) {

	"use strict";

	var TitleScreen = Ω.Screen.extend({

		time: 0,

		font: new Ω.Font("../res/fonts/mamefont.png", 16, 16, "abcdefghijklmnopqrstuvwxyz0123456789~.,:!?'\"&<>"),

		init: function () {

		},

		tick: function () {

			this.time += 1;

			if (Ω.input.pressed("space") && this.time > 20) {
				game.setScreen(new LevelScreen());
			}

		},

		render: function (gfx) {

			var c = gfx.ctx,
				title = "segfault",
				coming = "coming soon!",
				start = "[space]";

			this.clear(gfx, "#123");

			this.font.render(gfx, title, gfx.w / 2 - this.font.w * (title.length / 2), gfx.h * 0.4);
			this.font.render(gfx, coming, gfx.w / 2 - this.font.w * (coming.length / 2), gfx.h * 0.6);

		}

	});

	window.TitleScreen = TitleScreen;

}(Ω));