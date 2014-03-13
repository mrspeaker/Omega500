(function (Ω) {

	"use strict";

	var Image = Ω.Class.extend({

		w: 0,
		h: 0,

		init: function (path, flipFlags, scale) {

			var self = this;

			this.path = path;

			Ω.gfx.loadImage(path, function (img){

				self.img = img;
				self.w = img.width * self.scale;
				self.h = img.height * self.scale;

			}, flipFlags);

			this.scale = scale || 1;

		},

		render: function (gfx, x, y) {

			gfx.ctx.drawImage(
				this.img,
				x,
				y,
				this.img.width * this.scale,
				this.img.height * this.scale
			);

		}

	});

	Ω.Image = Image;

}(window.Ω));
