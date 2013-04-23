(function (Ω) {

	"use strict";

	var Screen = Ω.Class.extend({

		tick: function (d) {},

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "hsl(0, 40%, 50%)";
			c.fillRect(0, 0, gfx.w, gfx.h);

		}

	});

	Ω.Screen = Screen;

}(Ω));
