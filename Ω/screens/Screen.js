(function (Ω) {

	"use strict";

	var Screen = Ω.Class.extend({

		loaded: true,
		frame: 0, // incremented directly by game.js

		renderables: null,

		_bodies: null, // Holds new bodies to be added next tick
		bodies: null, // Current dictionary of active bodies

		tick: function () {},
		_tick: function () {
			var self = this;

			// this.frame++; TODO: if this new magic works, increment frame here instead of
			// in game.

			if (this.bodies) {
				this._bodies = this._bodies.filter(function (r) {
					var tag = r[1] || "default";

					if (!self.bodies[tag]) {
						self.bodies[tag] = [];
					}
					self.bodies[tag].push(r[0]);
					return false;
				});

				for (var tag in this.bodies) {
					this.bodies[tag] = this.bodies[tag].filter(function (body) {
						var stillAlive = body.tick() && !(body.remove);
						// Add children
						if (body._bodies) {
							body._bodies.forEach(function (innerBody) {
								self.add(innerBody[0], innerBody[1]);
							});
							body._bodies.length = 0;
						}
						return stillAlive;
					});
				}
			}

			this.tick();
		},

		add: function (body, tag) {
			if (!this.bodies) {
				this._bodies = [];
				this.bodies = {
					"default": []
				};
			}
			this._bodies.push([body, tag]);

			return body;
		},

		get: function (tag) {
			return this.bodies[tag] || [];
		},

		clear: function (gfx, col) {

			gfx.clear(col);

		},

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "hsl(0, 0%, 0%)";
			c.fillRect(0, 0, gfx.w, gfx.h);

		},
		renderFore: function () {},
		_render: function (gfx) {
			this.render(gfx);
			if (this.bodies) {
				for (var tag in this.bodies) {
					this.bodies[tag].forEach(function (b) {
						b.render(gfx);
					});
				}
			}
			this.renderFore(gfx);
		}

	});

	Ω.Screen = Screen;

}(window.Ω));
