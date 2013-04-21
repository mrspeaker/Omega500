(function (Ω) {

	"use strict";

	var TestGame = Ω.Game.extend({

		canvas: "#board",

		init: function (w, h) {

			this._super(w, h);

			Ω._progress = function (cur, max) {
				// use for progress bar
			};


			Ω.input.bind(Ω.input.KEYS.space, "fire");
			Ω.input.bind(Ω.input.KEYS.escape, "escape");
			Ω.input.bind(Ω.input.KEYS.left, "left");
			Ω.input.bind(Ω.input.KEYS.right, "right");
			Ω.input.bind(Ω.input.KEYS.up, "up");
			Ω.input.bind(Ω.input.KEYS.down, "down");

			this.setScreen(new TitleScreen());

		}

	});

	window.TestGame = TestGame;

}(Ω));