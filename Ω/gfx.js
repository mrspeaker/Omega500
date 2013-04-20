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

		},

		drawImage: function (img, x, y) {

			this.ctx.drawImage(
				img,
				x,
				y);
		},

		drawTextShadow: function (msg, x, y, shadow, font) {

			var c = this.ctx;

			shadow = shadow || 2;
			if (font) {
				c.font = font;
			}
			c.fillStyle = "#000";
			c.fillText(msg, x + shadow, y + shadow);
			c.fillStyle = "#fff";
			c.fillText(msg, x, y);

		}


	};

	Ω.gfx = gfx;

}(Ω));
