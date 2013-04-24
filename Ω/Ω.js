var Ω = (function() {

	"use strict";

	var preloading = true,
		assetsToLoad = 0,
		maxAssets = 0,
		timers = []

	return {
		_onload: null,
		_progress: null,
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
				if (--assetsToLoad === 0) {
					preloading = false;
					Ω._onload && Ω._onload();
				} else {
					Ω._progress && Ω._progress(assetsToLoad, maxAssets)
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

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

