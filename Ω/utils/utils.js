(function (Ω) {

	"use strict";

	Ω.utils = {

		rand: function (min, max) {

			return Math.floor(Math.random() * min);

		},

		oneIn: function (max) {

			return this.rand(max) === 1;

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
				dy = a.y - b.y,
				angle = Math.atan2(dy, dx);

			return angle;// % Math.PI;

		},

		snap: function(value, snapSize) {

			return Math.floor(value / snapSize) * snapSize;

		},

		snapRound: function(value, snapSize) {

			var steps = value / snapSize | 0,
				remain = value - (steps * snapSize),
				rounder = remain > (snapSize / 2) ? Math.ceil : Math.floor;

			return rounder(value / snapSize) * snapSize;

		},

		neighbours: function (radius, cb, onlyOuterRing) {

			var j, i;

			for(j = -radius; j <= radius; j++) {
				for(i = -radius; i <= radius; i++) {
					if(onlyOuterRing && (Math.abs(i) !== radius && Math.abs(j) !== radius)){
						continue;
					}
					cb && cb(i, j);
				}
			}

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

		}

	};

	Ω.utils.State = function (state) {

		this.state = state;
		this.last = "";
		this.count = -1;
		this.locked = false;

	};

	Ω.utils.State.prototype = {

		set: function (state) {

			if (this.locked) {
				return;
			}

			this.last = this.state;
			this.state = state;
			this.count = -1;

		},

		get: function () { return this.state; },

		tick: function () { this.count++; },

		first: function () { return this.count === 0; },

		is: function (state) { return state === this.state; },

		isNot: function (state) { return !this.is(state); },

		isIn: function () {

			var state = this.state,
				args = Array.prototype.slice.call(arguments);

			return args.some(function (s) {

				return s === state;

			});

		},

		isNotIn: function () {

			return !(this.isIn.apply(this, arguments));

		}

	};

}(Ω));
