(function (Ω) {

	"use strict";

	var TitleScreen = Ω.Screen.extend({

		time: 0,
		bg: new Ω.Image("../res/images/background.png"),
		theme: new Ω.Sound("../res/audio/terminal.wav"),

		font: new Ω.Font("../res/fonts/mamefont.png", 16, 16, "abcdefghijklmnopqrstuvwxyz0123456789~.,:!?'\"&<>"),

		init: function () {

			this.theme.play();

		},

		tick: function () {

			this.time += 1;

			if ((Ω.input.pressed("space") || Ω.input.isDown("touch")) && this.time > 20) {
				game.setScreen(new MainScreen());
			}

		},

		render: function (gfx) {

			var c = gfx.ctx,
				title = "Ω500: testin'",
				start = "[space]";

			this.bg.render(gfx, 0, 0);

			this.font.render(gfx, title, gfx.w / 2 - this.font.w * (title.length / 2), gfx.h * 0.4);
			c.font = "8pt Monospace";
			gfx.text.drawShadowed(start, gfx.w / 2 - gfx.text.getHalfWidth(start), gfx.h * 0.75, 1);

		}

	});

	window.TitleScreen = TitleScreen;

}(Ω));