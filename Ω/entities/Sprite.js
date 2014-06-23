(function (Ω, PIXI) {

	"use strict";

	var Sprite = Ω.Entity.extend({

		opt: null,

		init: function (x, y, w, h) {

			var opt = this.opt;

			if (!this.opt) {
				console.error("No options (.opt object) defined for sprite.");
				return;
			}
			if (!PIXI) {
				console.error("Need to include PIXI.js to use Sprites.");
				return;
			}

			var sprite = new PIXI.Sprite(PIXI.Texture.fromImage(opt.img));
			sprite.offset = {x: 0, y: 0};
			if (opt.scale) {
				sprite.scale.x = opt.scale[0];
				sprite.scale.y = opt.scale[1];
			}
			if (opt.filters) {
				sprite.filters = opt.filters;
			}
			if (opt.offset) {
				sprite.offset.x = opt.offset[0];
				sprite.offset.y = opt.offset[1];
			}

			game.addChild(sprite);

			this.sprite = sprite;
			this._super(x, y, w, h);

		},

		render: function (gfx, cam) {

			var s = this.sprite;

			s.y = this.y - cam.y + s.offset.x;
            s.x = this.x - cam.x + s.offset.y;
		}

	});

	Ω.Sprite = Sprite;

}(window.Ω, window.PIXI));
