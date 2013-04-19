(function (Ω) {

	"use strict";

	var Game = Ω.Class.extend({

		canvas: "body",

		running: false,

		preset_dt: 1 / 60,
		currentTime: Date.now(),
		accumulator: 0,

		screen: new Ω.Screen(),
		lastScreen: null,

		dialog: null,

		time: 0,

		init: function () {

			var ctx = initCanvas(this.canvas);

			Ω.env.w = ctx.canvas.width;
			Ω.env.h = ctx.canvas.width;

			Ω.gfx.init(ctx);
			Ω.input.init();

            this.running = true;

		},

		reset: function () {},

		go: function () {
			this.run(Date.now());
		},

		run: function () {

			this.tick(1);
			this.render();

			var self = this;

			window.requestAnimationFrame(function () {
            	self.run(Date.now());
            });

		},

		stop: function () {},

		tick: function (d) {
			this.screen.tick(d);
		},

		render: function () {

			var gfx = Ω.gfx;

			this.screen.render(gfx);
		},

		setScreen: function (screen) {

			this.lastScreen = this.screen;
			this.screen = screen;

		}
	});

	/*
		Create or assign the canvas element
	*/
	function initCanvas(canvasSelector) {

		var selCanvas = document.querySelector(canvasSelector),
			newCanvas,
			ctx;

		if (selCanvas == null) {
			console.error("Canvas DOM container not found:", canvasSelector);
			canvasSelector = "body";
			selCanvas = document.querySelector(canvasSelector);
		}

		if (selCanvas.nodeName.toUpperCase() === "CANVAS") {
			ctx = selCanvas.getContext("2d");
		} else {
			newCanvas = document.createElement("canvas");
			selCanvas.appendChild(newCanvas);
			ctx = newCanvas.getContext("2d");
		}

		if (!ctx) {
			console.error("Could not get 2D context.");
		}

		return ctx;
	}

	Ω.Game = Game;

}(Ω));
