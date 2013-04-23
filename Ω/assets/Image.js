(function (Ω) {

	"use strict";

	var Image = Ω.Class.extend({

		init: function (path) {

			this.path = path;
			this.img = Ω.gfx.loadImage(path, (function (){
				return Ω.preload();
			}()));

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
