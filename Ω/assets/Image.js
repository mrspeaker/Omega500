(function (Ω) {

	"use strict";

	var Image = Ω.Class.extend({

		init: function (path) {

			var self = this;

			this.path = path;

			Ω.gfx.loadImage(path, function (img){

				self.img = img;

			});

		},

		render: function (gfx, x, y) {

			gfx.ctx.drawImage(
				this.img,
				x,
				y
			);

		}

	});

	Ω.Image = Image;

}(Ω));
