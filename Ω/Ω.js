var Ω = (function() {

	"use strict";

	var preloading = true,
		assetsToLoad = 0,
		maxAssets = 0,
		timers = []

	return {

		evt: {
			onload: [],
			progress: []
		},

		env: {
			w: 0,
			h: 0
		},

		preload: function () {

			if (!preloading) {
				return function () {};
			}

			maxAssets = Math.max(++assetsToLoad, maxAssets);

			return function () {

				assetsToLoad -= 1;

				Ω.evt.progress.map(function (p) {
					return p(assetsToLoad, maxAssets);
				});

				if (assetsToLoad === 0) {
					// FIXME: onload could fire if first resource finishes
					// loading before second added to queue
					if (!preloading) {
						console.error("Preloading finished (onload called) multiple times!");
					}
					preloading = false;
					Ω.evt.onload.map(function (o) {
						o();
					});
				}


			}
		},

		pageLoad: function () {

			if (maxAssets === 0) {
				// No assets to load, so fire onload
				Ω.evt.onload.map(function (o) {
					o();
				});
			}

		},

		timers: {

			add: function (timer) {

				timers.push(timer);

			},

			tick: function () {

				timers = timers.filter(function (t) {

					return t.tick();

				});

			}

		}

	};

}());

// Polyfills
Array.isArray || (Array.isArray = function (a){ return '' + a !== a && {}.toString.call(a) == '[object Array]' });
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

