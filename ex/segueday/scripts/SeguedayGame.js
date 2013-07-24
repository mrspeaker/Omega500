(function (Ω) {

	"use strict";

	var SeguedayGame = Ω.Game.extend({

		canvas: "#board",

		init: function (w, h) {

			this._super(w, h);

			Ω.evt.progress.push(function (remaining, max) {

            });

			Ω.input.bind([
				["space", "space"],
				["escape", "escape"],
				["left", "left"],
				["right", "right"],
				["up", "up"],
				["down", "down"]
			]);

		},

		load: function () {

			this.setScreen(new TitleScreen());

		}

	});

	window.SeguedayGame = SeguedayGame;

}(Ω));