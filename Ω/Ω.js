var Ω = (function() {

	"use strict";

	var preloading = true,
		assetsToLoad = 0,
		maxAssets = 0,
		timers = []

	return {

		evt: {
			onload: null,
			progress: null
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

				Ω._progress && Ω._progress(assetsToLoad, maxAssets);

				// FIXME: this could fire if first resource finishes
				// loading before second added to queue
				if (assetsToLoad === 0) {
					preloading = false;
					Ω.evt.onload && Ω.evt.onload();
				}


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

