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

		loadImage: function (path, cb, flipFlags) {

			// TODO: don't need to reload if non-flipped image exists
			var cachedImage = images[path + (flipFlags ? ":" + flipFlags : "")];

			if (cachedImage) {
				if (!cachedImage._loaded) {
					cachedImage.addEventListener("load", function() {
						cb && cb(cachedImage);
					}, false);
					cachedImage.addEventListener("load", function() {
						cb && cb(cachedImage);
					}, false);
				} else {
					cb && cb(cachedImage);
				}
				return;
			}

			var resolve = Ω.preload(path),
				image = new Image(),
				self = this,
				onload = function () {

					var procImage;

					if (flipFlags >= 0) {
						procImage = self.flipImage(image, flipFlags);
					}

					this._loaded = true;
					cb && cb(procImage || image);
					resolve();

				}

			image._loaded = false;
			image.src = path;
			image.addEventListener("load", onload, false);
			image.addEventListener("error", function() {

				console.error("Error loading image", path);
				onload.call(this);

			}, false);
			images[path + (flipFlags ? ":" + flipFlags : "")] = image;

		},

		drawImage: function (img, x, y) {

			this.ctx.drawImage(
				img,
				x,
				y);
		},

		flipImage: function (img, flags) {

			// flip x = 1, y = 2, both = 3, none = 0
			var ctx = this.createCanvas(img.width, img.height);

			ctx.save();
			ctx.translate(flags & 1 ? img.width : 0, flags & 2 ? img.height : 0);
			ctx.scale(flags & 1 ? -1 : 1, flags & 2 ? -1 : 1);
			ctx.drawImage(img, 0, 0);
			ctx.restore();

			return ctx.canvas;

		},

		createCanvas: function (w, h) {

			var cn = document.createElement("canvas");

			cn.setAttribute("width", w);
			cn.setAttribute("height", h);

			return cn.getContext("2d");

		},

		text: {

			drawShadowed: function (msg, x, y, shadow, font) {

				var c = gfx.ctx;

				shadow = shadow || 2;
				if (font) {
					c.font = font;
				}
				c.fillStyle = "#000";
				c.fillText(msg, x + shadow, y + shadow);
				c.fillStyle = "#fff";
				c.fillText(msg, x, y);

			},


			getWidth: function (msg) {

				return gfx.ctx.measureText(msg).width;

			},

			getHalfWidth: function (msg) {

				return this.getWidth(msg) / 2;

			},

			getHeight: function (msg) {

				return gfx.ctx.measureText(msg).height;

			},

			getHalfHeight: function (msg) {

				return this.getHeight(msg) / 2;

			}

		}

	};

	Ω.gfx = gfx;

}(Ω));
