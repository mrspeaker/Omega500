(function (Ω) {

	"use strict";

	var MainScreen = Ω.Screen.extend({

		init: function () {

			this.p1 = new Player(0);
			this.p2 = new Player(-50);

		},

		tick: function (d) {

			this.p1.tick(d);
			this.p2.tick(d);

			if (this.p1.x > 300) {
				this.p1.x = 0;
			}
			if (this.p2.x > 300) {
				this.p2.x = 0;
			}

		},

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "hsl(195, 40%, 50%)";
			c.fillRect(0, 0, gfx.w, gfx.h);

			this.p1.render(gfx);
			this.p2.render(gfx);

			c.fillStyle = "hsl(195, 40%, 30%)";
			c.fillRect(0, 100, gfx.w, gfx.h - 100);
		}
	});

	window.MainScreen = MainScreen;

}(Ω));
