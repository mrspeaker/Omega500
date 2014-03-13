(function (Ω) {

	"use strict";

	Ω.utils = {

		rand: function (max, min) {

			max = max || 1;
			min = min || 0;

			return Math.floor(Math.random() * (max - min)) + min;

		},

		oneIn: function (max) {

			return this.rand(max) === 1;

		},

		rnd: {

			seed: 42,

			rand: function(max, min) {

				max = max || 1;
				min = min || 0;

				this.seed = (this.seed * 9301 + 49297) % 233280;

				return ((this.seed / 233280) * (max - min) + min) | 0;
			}
		},

		// This gets overwritten by game.now
		// To use game time, not real-world time
		now: function () {

			return Date.now();

		},

		since: function (time) {

			return this.now() - time;

		},

		toggle: function (time, steps, offset) {

			return ((this.now() + (offset || 0)) / time) % steps >> 0;

		},

		neighbours: function (radius, cb, onlyOuterRing) {

			var j, i;

			for (j = -radius; j <= radius; j++) {
				for(i = -radius; i <= radius; i++) {
					if(onlyOuterRing && (Math.abs(i) !== radius && Math.abs(j) !== radius)){
						continue;
					}
					cb && cb(i, j);
				}
			}

		},

		constrain: function (pos, bounds, wrap) {

			var xo = pos[0],
				yo = pos[1];
			if (xo < 0) { xo = wrap ? bounds.w : 0; }
			if (yo < 0) { yo = wrap ? bounds.h : 0; }
			if (xo > bounds.w) { xo = wrap ? 0 : bounds.w; }
			if (yo > bounds.h) { yo = wrap ? 0 : bounds.h; }

			return [xo, yo];

		},

		formatTime: function (t) {

			t /= 1000;
			var mins = ~~(t / 60),
				secs = ~~(t - (mins * 60));

			mins = mins.toString().length === 1 ? "" + mins : mins;
			secs = secs.toString().length === 1 ? "0" + secs : secs;
			return mins + ":" + secs;

		},

		formatScore: function (score, digits) {

			return ((score + Math.pow(10, digits)) + "").slice(1);

		},

		loadScripts: function (scripts, cb) {

			var loaded = 0;

			scripts.forEach(function (path) {

				var script = document.createElement('script'),
					qs = window.env.desktop ? "?" + new Date().getTime() : "";

				script.src = "scripts/" + path + ".js" + qs;
				script.onload = function () {
					// FIXME: where did this come from?: resources.toLoadLoaded++;
					if (loaded++ === scripts.length - 1) {
						cb && cb();
					}
				};

				document.body.appendChild(script);

			});

		},

		getByKeyValue: function (arrayOfObj, key, value) {

			return this.getAllByKeyValue(arrayOfObj, key, value)[0];

		},

		getAllByKeyValue: function (arrayOfObj, key, value) {

			return arrayOfObj.filter(function (o) {
				if (o[key] && o[key] === value) {
					return true;
				}
			});

		},

		ajax: function (url, callback) {

			var xhr = new XMLHttpRequest();
			xhr.addEventListener("readystatechange", function() {
				if (this.readyState < 4) {
					return;
				}

				if (xhr.readyState == 4) {
					callback(xhr);
				}

			}, false);
			xhr.open("GET", url, true);
			xhr.send("");

		},

		fullscreen: {

			toggle: function (dom) {

				if (!document.fullscreenElement &&
					!document.mozFullScreenElement &&
					!document.webkitFullscreenElement) {
					this.request(dom);
				} else {
					this.cancel();
				}
			},

			request: function (dom) {

				if (typeof dom === "string") {
					dom = document.querySelector(dom);
				}

				if (dom.requestFullscreen) {
					dom.requestFullscreen();
				} else if (dom.mozRequestFullScreen) {
					dom.mozRequestFullScreen();
				} else if (dom.webkitRequestFullscreen) {
					dom.webkitRequestFullscreen();
				}

			},

			cancel: function () {

				if (document.cancelFullScreen) {
					document.cancelFullScreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
				}

			}

		},

	};

}(window.Ω));
