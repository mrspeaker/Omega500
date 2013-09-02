(function (Ω) {

	"use strict";

	var PlatformGame = Ω.Game.extend({

		canvas: "#board",

		init: function (w, h) {

			this._super(w, h);

			Ω.evt.progress.push(function (remaining, max) {
                console.log((((max - remaining) / max) * 100 | 0) + "%");
            });

			Ω.input.bind({
				"space": "space",
				"touch": "touch",
				"escape": "escape",
				"left": "left",
				"right": "right",
				"up": "up",
				"down": "down",
				"moused": "mouse1"
			});

		},

		load: function () {

			this.setScreen(new TitleScreen());

		}

	});

	window.PlatformGame = PlatformGame;

}(Ω));