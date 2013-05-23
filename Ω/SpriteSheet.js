(function (Ω) {

	"use strict";

	var SpriteSheet = Ω.Class.extend({

		init: function (path, width, height) {

			this.path = path;
			this.w = width;
			this.h = height || width;
			this.cellW = 8;
			this.cellH = 2;

			var self = this;

			//console.log("Sheet cellw not set yet...", path);

			this.sheet = Ω.gfx.loadImage(path, (function (){
				return function (img) {
					console.log("here", arguments, path);
					// Holy poopballs - fix this mess! if image already
					// loaded by gfx.load image then its returned before load event...
					if (img) {
						img.addEventListener("load", function(){
							self.cellW = img.width / self.w | 0;
							self.cellH = img.height / self.h | 0;
							//console.log("Sheet loaded via img.add", self.cellW, self.cellH, path);
							Ω.preload();
						}, false);
					} else {
						self.cellW = self.sheet.width / self.w | 0;
						self.cellH = self.sheet.height / self.h | 0;
						//console.log("Sheet loaded via callback", self.cellW, self.cellH, path);
						Ω.preload();
					}
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
