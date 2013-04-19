(function (Ω) {

	"use strict";

	var gfx = {

		init: function (ctx) {

			this.ctx = ctx;
			this.canvas = ctx.canvas;

			this.w = this.canvas.width;
			this.h = this.canvas.height;

		}

	};

	Ω.gfx = gfx;

}(Ω));
