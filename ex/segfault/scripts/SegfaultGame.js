(function (Ω) {

	"use strict";

	var SegfaultGame = Ω.Game.extend({

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

		reset: function () {

			this._super();
			this.load();

		},

		load: function () {

			this.setScreen(new TitleScreen());

		}

	});

	window.SegfaultGame = SegfaultGame;

}(Ω));