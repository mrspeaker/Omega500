(function (Ω) {

	"use strict";

	var SpriteSheet = Ω.Class.extend({

		init: function (path, width, height) {

			this.path = path;
			this.w = width;
			this.h = height || width;

			var self = this;

			this.sheet = Ω.gfx.loadImage(path,(function (){
				return function () {
					self.cellW = self.sheet.width / self.w | 0;
					self.cellH = self.sheet.height / self.h | 0;
					Ω.preload();
				}
			}()));

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
