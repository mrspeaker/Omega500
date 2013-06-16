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

			console.log(path);

			if (images[path]) {
				if (!images[path]._loaded) {
					cb && images[path].addEventListener("load", function() {
						cb(images[path]);
					}, false);
				} else {
					cb && cb(images[path]);
				}
				return;
			}

			var resolve = Ω.preload(),
				image = new Image();

			image._loaded = false;
			image.src = path;
			image.addEventListener("load", function() {

				this._loaded = true;
				cb && cb(image);
				resolve();

			}, false);
			images[path] = image;

		},

		drawImage: function (img, x, y) {

			this.ctx.drawImage(
				img,
				x,
				y);
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
