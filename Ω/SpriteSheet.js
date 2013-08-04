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

				self.sheet = img;
				if (flipFlags) {

					self.sheet = self.flipImage(img.canvas || img, flipFlags);

				}

				self.cellW = img.width / self.w | 0;
				self.cellH = img.height / self.h | 0;

			});

		},

		flipImage: function (img, flags) {

			// flip x = 1, y = 2, both = 3

			var ctx = Ω.gfx.createCanvas(
					img.width * (flags & 1 ? 2 : 1),
					img.height * (flags & 2 ? 2 : 1)
				),
				cellW = img.width / this.w | 0,
				cellH = img.height / this.h | 0,
				i,
				j;

			// Draw the original
			ctx.drawImage(img, 0, 0);

			if (flags & 1) {
				// Flipped X
				for (j = 0; j < cellH; j++) {
					for (i = 0; i < cellW; i++) {
						ctx.save();
						ctx.translate(i * this.w * 0.5, j * this.h);
						ctx.scale(-1 , 1);
						this.render({ctx:ctx}, i, j, -(i * this.w * 0.5) - img.width - this.w, 0);
						ctx.restore();
					}
				}
			}

			if (flags & 2) {
				// Flipped Y
				for (j = 0; j < cellH; j++) {
					for (i = 0; i < cellW; i++) {
						ctx.save();
						ctx.translate(i * this.w, j * this.h * 0.5);
						ctx.scale(1 , -1);
						this.render({ctx:ctx}, i, j, 0, -(j * this.h * 0.5) - img.height - this.h);
						ctx.restore();
					}
				}
			}

			if (flags & 3) {
				// Flipped both
				for (j = 0; j < cellH; j++) {
					for (i = 0; i < cellW; i++) {
						ctx.save();
						ctx.translate(i * this.w * 0.5, j * this.h * 0.5);
						ctx.scale(-1 , -1);
						this.render(
							{ctx:ctx},
							i,
							j,
							-(i * this.w * 0.5) - img.width - this.w,
							-(j * this.h * 0.5) - img.height - this.h);
						ctx.restore();
					}
				}
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
