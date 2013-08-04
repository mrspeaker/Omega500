(function (Ω) {

	"use strict";

	var SpriteSheet = Ω.Class.extend({

		init: function (path, width, height, flipFlags) {

			this.path = path;
			this.w = width;
			this.h = height || width;
			this.cellW = 8;
			this.cellH = 2;

			var self = this;

			Ω.gfx.loadImage(path, function (img) {

				if (flipFlags) {

					img = self.flipImage(img.canvas || img, flipFlags);

				}

				self.sheet = img;
				self.cellW = img.width / self.w | 0;
				self.cellH = img.height / self.h | 0;

			});

		},

		flipImage: function (img, flags) {

			// flip x = 1, y = 2, both = 3

			// TODO: flip each cell, rather than the entire image

			var ctx = Ω.gfx.createCanvas(
				img.width * (flags & 1 ? 2 : 1),
				img.height * (flags & 2 ? 2 : 1));

			ctx.drawImage(img, 0, 0);

			if (flags & 1) {
				ctx.save();
				ctx.translate(img.width, 0);
				ctx.scale(-1, 1);
				ctx.drawImage(img, -img.width, 0);
				ctx.restore();
			}

			if (flags & 2) {
				ctx.save();
				ctx.translate(0, img.height);
				ctx.scale(1, -1);
				ctx.drawImage(img, 0, -img.height);
				ctx.restore();
			}

			if (flags & 3) {
				ctx.save();
				ctx.translate(img.width, img.height);
				ctx.scale(-1, -1);
				ctx.drawImage(img, -img.width, -img.height);
				ctx.restore();
			}

			return ctx.canvas;

		},

		render: function (gfx, col, row, x, y, w, h, scale) {
			if(col === -1) {
				return;
			}
			scale = scale || 1;
			h = h || 1;
			w = w || 1;

			gfx.ctx.drawImage(
				this.sheet,
				col * this.w,
				row * this.h,
				w * this.w,
				h * this.h,
				x,
				y,
				w * this.w * scale,
				h * this.h * scale);
		}

	});

	Ω.SpriteSheet = SpriteSheet;

}(Ω));
