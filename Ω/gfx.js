(function (Ω) {

	"use strict";

	var images = {};

	var gfx = {

		init: function (ctx) {

			this.ctx = ctx;
			this.canvas = ctx.canvas;

			this.w = this.canvas.width;
			this.h = this.canvas.height;

		},

		loadImage: function (path, cb) {

			if (images[path]) {
				return images[path];
			}

			var image = new Image();

			image.src = path;
			image.onload = function() {
				cb && cb();
			};
			images[path] = image;
			return image;

		}

	};

	Ω.gfx = gfx;

}(Ω));
