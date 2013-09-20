(function (Ω) {

	"use strict";

	var Pitfell = Ω.Game.extend({

		canvas: "#board",

		init: function (w, h) {

			this._super(w, h);

			Ω.evt.progress.push(function (remaining, max) {
                //console.log((((max - remaining) / max) * 100 | 0) + "%");
            });

			Ω.input.bind({
				"fire": ["space", "mouse1"],
				"escape": "escape",
				"left": "left",
				"right": "right",
				"up": "up",
				"down": "down"
			});

		},

		load: function () {

			this.setScreen(new MainScreen());

		}

	});

	window.Pitfell = Pitfell;

}(Ω));