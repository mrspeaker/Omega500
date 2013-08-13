(function (Ω) {

	"use strict";

	var MainDialog = Ω.Dialog.extend({

		render: function (gfx) {

			this._super(gfx);

			var c = gfx.ctx;
			c.fillStyle = (this.time * 5) % 2 | 0 ? "rgba(0, 0, 0, 0.7)" : "#fff";
			c.fillText("Paused", gfx.w / 2 - 20, gfx.h / 2);

		}

	});

	window.MainDialog = MainDialog;

}(Ω));
