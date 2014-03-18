(function (Ω) {

	"use strict";

	var Screen = Ω.Class.extend({

		loaded: true,
		frame: 0, // incremented directly by game.js

		bodies: null, // Holds new bodies to be added next tick

		_bodies_zindex: null, // Holds zIndex for body dictionary
		_bodies: null, // Current dictionary of active bodies

		camera: null,

		tick: function () {},
		_tick: function () {
			var self = this;

			// this.frame++; TODO: if this new magic works, increment frame here instead of
			// in game.

			if (this._bodies) {

				// Erfph... make this all nicer, yo.
				this.bodies = this.bodies.filter(function (r) {
					var tag = r[1] || "default",
						spliced = false,
						idx;

					if (!self._bodies[tag]) {
						self._bodies[tag] = [];

						for (idx = 0; idx < self._bodies_zindex.length; idx++) {
							if (r[2] < self._bodies_zindex[idx][0]) {
								self._bodies_zindex.splice(idx, 0, [r[2], r[1]]);
								spliced = true;
								break;
							}
						}
						if (!spliced) {
							self._bodies_zindex.push([r[2], r[1]]);
						}
					}
					self._bodies[tag].push(r[0]);
					return false;
				});

				for (var tag in this._bodies) {
					this._bodies[tag] = this._bodies[tag].filter(function (body) {
						var stillAlive = body.tick() && !(body.remove);
						// Add children
						if (body.bodies) {
							body.bodies.forEach(function (innerBody) {
								self.add(innerBody[0], innerBody[1], innerBody[2]);
							});
							body.bodies.length = 0;
						}
						return stillAlive;
					});
				}
			}

			this.tick();
		},

		add: function (body, tag, zIndex) {
			if (!this._bodies) {
				this.bodies = [];
				this._bodies_zindex = [[99, "default"]];
				this._bodies = {
					"default": []
				};
			}
			this.bodies.push([body, tag, zIndex || 99]);

			return body;
		},

		get: function (tag) {
			return this._bodies[tag] || [];
		},

		clear: function (gfx, col) {

			if (this.camera) {
				var c = gfx.ctx;
				c.fillStyle = col;
				c.fillRect(this.camera.x, this.camera.y, this.camera.w, this.camera.h);
			}
			else {
				gfx.clear(col);
			}

		},

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "hsl(0, 0%, 0%)";
			c.fillRect(0, 0, gfx.w, gfx.h);

		},
		_render: function (gfx) {
			this.renderBG && this.renderBG(gfx);

			if (this.camera) {
				this.camera.renderPre(gfx);
				this.render(gfx, this.camera);
				if (this._bodies) {
					var bodies = [];
					this._bodies_zindex.forEach(function(bz) {
						bodies.push(this._bodies[bz[1]]);
					}, this);
					this.camera.render(gfx, bodies, true);
				}
				this.camera.renderPost(gfx);
			} else {
				this.render(gfx);
				if (this._bodies) {
					for (var tag in this._bodies) {
						this._bodies[tag].forEach(function (b) {
							b.render(gfx);
						});
					}
				}
			}

			this.renderFG && this.renderFG(gfx);
		}

	});

	Ω.Screen = Screen;

}(window.Ω));
