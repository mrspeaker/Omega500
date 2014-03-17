(function (Ω) {

	"use strict";

	var Camera = Ω.Class.extend({

		x: 0,
		y: 0,
		w: 0,
		h: 0,

		debug: false,

		init: function (x, y, w, h) {

			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.zoom = 1;

		},

		tick: function () {},

		moveTo: function (x, y) {
			this.x = x;
			this.y = y;
		},

		moveBy: function (x, y) {
			this.x += x;
			this.y += y;
		},

		renderPre: function (gfx) {
			var c = gfx.ctx;

			c.save();
			c.scale(this.zoom, this.zoom);
			c.translate(-(Math.round(this.x)), -(Math.round(this.y)));

		},

		renderPost: function (gfx) {
			var c = gfx.ctx;

			if (this.debug) {
				c.strokeStyle = "red";
				c.strokeRect(this.x, this.y, this.w / this.zoom, this.h / this.zoom);
			}

			c.restore();
		},

		render: function (gfx, renderables, noPrePost) {

			var self = this;

			!noPrePost && this.renderPre(gfx);

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

					return r.repeat || !(
						r.x + r.w < self.x ||
						r.y + r.h < self.y ||
						r.x > self.x + (self.w / self.zoom) ||
						r.y > self.y + (self.h / self.zoom));

				})
				// Draw 'em
				.forEach(function (r) {

					r.render(gfx, self);

				});

			!noPrePost && this.renderPost(gfx);

		}

	});

	Ω.Camera = Camera;

}(window.Ω));
