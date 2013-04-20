(function (Ω) {

	"use strict";

	var Anim = Ω.Class.extend({

		init: function (name, sheet, speed, frames) {

			this.name = name;
			this.sheet = sheet;
			this.frames = frames;
			this.speed = speed;

			this.reset();

		},

		tick: function (d) {

			var diff = Date.now() - this.frameTime;

			if (diff > this.speed) {
				this.frameTime = Date.now() + (Math.min(this.speed, diff - this.speed));
				if (++this.curFrame > this.frames.length - 1) {
					this.curFrame = 0;
				};
			};

		},

		reset: function () {
			this.curFrame = 0;
			this.frameTime = Date.now();
		},

		draw: function (gfx, x, y) {

			this.sheet.draw(
				gfx,
				this.frames[this.curFrame][0],
				this.frames[this.curFrame][1],
				x,
				y,
				1,
				1,
				1);

		}

	});

	Ω.Anim = Anim;

}(Ω));
