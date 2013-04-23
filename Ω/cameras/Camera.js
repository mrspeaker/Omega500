(function (Ω) {

	"use strict";

	var Camera = Ω.Class.extend({

		x: 0,
		y: 0,
		w: 0,
		h: 0,

		init: function (x, y, w, h) {
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
		},

		render: function (gfx, renderables) {
			var c = gfx.ctx,
				self = this,
				minX = this.x,
				minY = this.y,
				maxX = this.x + this.w,
				maxY = this.y + this.h;

			c.translate(-this.x, -this.y);

			renderables
				// Flatten to an array
				.reduce(function (ac, e) {

					if (Array.isArray(e)) {
						return ac.concat(e);
					}
					ac.push(e);
					return ac;

				}, [])
				// Remove out-of-view entites
				.filter(function (r) {

					return !(
						r.x + r.w < self.x ||
						r.y + r.h < self.y ||
						r.x > self.x + self.w ||
						r.y > self.y + self.h);

				})
				// Draw 'em
				.forEach(function (r) {

					r.render(gfx, self);

				});

			c.translate(this.x, this.y);

		}

	});

	Ω.Camera = Camera;

}(Ω));
