(function (Ω) {

	"use strict";

	var Anim = Ω.Class.extend({

		init: function (name, sheet, speed, frames) {

			this.name = name;
			this.sheet = sheet;
			this.frames = frames;
			this.speed = speed;

			this.changed = false;

			this.reset();

		},

		tick: function () {

			var diff = Date.now() - this.frameTime;
			this.changed = false;

			if (diff > this.speed) {
				this.frameTime = Date.now() + (Math.min(this.speed, diff - this.speed));
				if (++this.curFrame > this.frames.length - 1) {
					this.curFrame = 0;
				};
				this.changed = true;
			};

		},

		reset: function () {
			this.curFrame = 0;
			this.frameTime = Date.now();
		},

		render: function (gfx, x, y) {

			this.sheet.render(
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
