(function (Ω) {

	"use strict";

	var keys = {},
		mouse = {
			x: null,
			y: null
		},
		actions = {},
		input,
		el;

	input = {

		KEYS: {
			enter: 13,
			space: 32,
			escape: 27,
			up: 38,
			down: 40,
			left: 37,
			right: 39,

			mouse1: -1,
			mouse2: -2,
			mouse3: -3,
			wheelUp: -4,
			wheelDown: -5
		},

		mouse: mouse,

		init: function (dom) {

			el = dom;

			bindKeys();
			bindMouse();

		},

		reset: function () {

		},

		tick: function () {

			var key;

			for(key in keys) {
				keys[key].wasDown = keys[key].isDown;
			}

		},

		bind: function (code, action) {

			var self = this;

			if (Array.isArray(code)) {
				code.forEach(function (k) {

					self.bind(k[0], k[1]);

				});
				return;
			}

			if (typeof code !== "number") {
				code = this.KEYS[code];
				if (!code) {
					console.error("Could not bind input: ", code);
					return;
				}
			}

			keys[code] = {
				action: action,
				isDown: false,
				wasDown: false
			};
			if (!actions[action]) {
				actions[action] = [];
			}
			actions[action].push(code);

		},

		pressed: function (action) {

			return this.isDown(action) && !(this.wasDown(action));

		},

		isDown: function (action) {
			var actionCodes = actions[action] || [];
			var back = actionCodes.some(function (code) {
				return keys[code].isDown;
			});
			return back;

		},

		wasDown: function (action) {
			var actionCodes = actions[action] || [];
			return actionCodes.some(function (k) {
				return keys[k].wasDown;
			});
		}
	}

	function keyed(code, isDown) {

		if (keys[code]) {
			keys[code].wasDown = keys[code].isDown;
			keys[code].isDown = isDown;
		}

	}

	function bindKeys() {

		document.addEventListener('keydown', function(e){
			keyed(e.keyCode, true);
		}, false );

		document.addEventListener('keyup', function(e){
			keyed(e.keyCode, false);
		}, false );

	}

	function bindMouse() {

		function setPos(e) {

			var relX = e.clientX - el.offsetLeft,
				relY = e.clientY - el.offsetTop;

			mouse.diff = {
				x: mouse.x - relX,
				y: mouse.y - relY
			};
			mouse.prev = {
				x: mouse.x,
				y: mouse.y
			};
			mouse.x = relX;
			mouse.y = relY;
		}

		document.addEventListener('mousedown', function(e){

			if (e.which === 1) {
				setPos(e);
				keyed(-1, true);
			}

		});

		document.addEventListener('mousemove', function(e){

			setPos(e);

		});

		document.addEventListener('mouseup', function(e){

			if (e.which === 1) {
				setPos(e);
				keyed(-1, false);
			}

		});
	}

	Ω.input = input;

}(Ω));
