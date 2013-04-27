(function (Ω) {

	"use strict";

	Ω.utils = {

		rand: function (min, max) {

			return Math.floor(Math.random() * min);

		},

		now: function () {

			return utils.now(); // window.game.time * 1000; //

		},

		since: function (time) {

			return utils.now() - time;

		},

		toggle: function (time, steps, offset) {

			return ((utils.now() + (offset || 0)) / time) % steps >> 0;

		},

		dist: function (a, b) {

			var dx = a.x ? a.x - b.x : a[0] - b[0],
				dy = a.y ? a.y - b.y : a[1] - b[1];

			return Math.sqrt(dx * dx + dy * dy);

		},

		center: function (e) {

			return {
				x: e.x + e.w / 2,
				y: e.y + e.h / 2
			};

		},

		angleBetween: function (a, b) {

			var dx = a.x - b.x,
				dy = a.y - b.y;

			return (Math.atan2(dy, dx) * 180 / Math.PI) % 360;

		},

		snap: function(value, snapSize) {

			return Math.floor(value / snapSize) * snapSize;

		},

		loadScripts: function (scripts, cb) {

			var loaded = 0;

			scripts.forEach(function (path) {

				var script = document.createElement('script'),
					qs = env.desktop ? "?" + new Date().getTime() : "";

				script.src = "scripts/" + path + ".js" + qs;
				script.onload = function () {
					resources.toLoadLoaded++;
					if (loaded++ === scripts.length - 1) {
						cb && cb();
					}
				};

				document.body.appendChild(script);

			});

		}
	};

}(Ω));
