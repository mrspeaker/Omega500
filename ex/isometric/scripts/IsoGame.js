(function (Ω) {

	"use strict";

	var IsoGame = Ω.Game.extend({

		canvas: "#board",

		init: function (w, h) {

			this._super(w, h);

			Ω.evt.progress.push(function (cur, max) {
				//console.log(cur, max);
			});

			Ω.input.bind({
				"fire": ["space", "touch"],
				"escape": "escape",
				"left": "left",
				"right": "right",
				"up": "up",
				"down": "down"
			});

		},

		load: function () {

			this.setScreen(new TitleScreen());

		}

	});

	window.IsoGame = IsoGame;

}(Ω));