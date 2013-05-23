(function (Ω) {

	"use strict";

	var Game = Ω.Class.extend({

		canvas: "body",

		running: false,

		preset_dt: 1 / 60,
		currentTime: Date.now(),
		accumulator: 0,

		screen: new Ω.Screen(),
		_screenPrev: null,
		_screenFade: 0,
		dialog: null,

		init: function (w, h, bgColor) {

			var ctx = initCanvas(this.canvas, w, h),
				self = this;

			Ω.env.w = ctx.canvas.width;
			Ω.env.h = ctx.canvas.height;

			ctx.fillStyle = bgColor || "#333";
			ctx.fillRect(0, 0, Ω.env.w, Ω.env.h);

			Ω.gfx.init(ctx);
			Ω.input.init(ctx.canvas);

			Ω._onload = function () {
				self.run(Date.now());
			};

			if (!Ω.preloading) {
				Ω._onload();
			}

            this.running = true;

		},

		reset: function () {},

		run: function () {

            var now = Date.now(),
                frameTime = Math.min((now - this.currentTime) / 1000, this.preset_dt),
                c;

            this.currentTime = now;
            this.accumulator += frameTime;

            if (this.running) {
                c = 0;
                while (this.accumulator >= this.preset_dt) {
                    c++;
                    this.tick();
                    this.accumulator -= this.preset_dt;
                }
                if (c > 1) {
                    console.log("ran " + c + " ticks");
                }

                this.render();
            }

            window.requestAnimationFrame(function () {
                game.run(Date.now());
            });

		},

		stop: function () {},

		tick: function () {

			if (this.dialog) {
				this.dialog.tick();
			} else {
				this.screen.loaded && this.screen.tick();
				Ω.timers.tick();
			}
			Ω.input.tick();

		},

		render: function () {

			var gfx = Ω.gfx;

			if (!this.screen.loaded) {
				return;
			}

			this.screen.render(gfx);
			if (this.screenFade > 0) {
				gfx.ctx.globalAlpha = this.screenFade;
				this.screenPrev.render(gfx);
				gfx.ctx.globalAlpha = 1;
			}
			this.dialog && this.dialog.render(gfx);

		},

		setScreen: function (screen) {


			var self = this;

			this.screenPrev = this.screen;
			this.screen = screen;

			if (this.screenPrev) {
			    this.screenFade = 1;
			    Ω.timer(10, function (ratio) {

			        self.screenFade = 1 - ratio;

			    }, function () {

			        self.screenFade = 0;

			    });
			}

		},

		setDialog: function (dialog) {

			this.dialog = dialog;

		},

		clearDialog: function () {

			this.setDialog(null);

		}
	});

	/*
		Create or assign the canvas element
	*/
	function initCanvas(canvasSelector, w, h) {

		w = w || 400;
		h = h || 225;

		var selCanvas = document.querySelector(canvasSelector),
			newCanvas,
			ctx;

		if (selCanvas == null) {
			console.error("Canvas DOM container not found:", canvasSelector);
			canvasSelector = "body";
			selCanvas = document.querySelector(canvasSelector);
		}

		if (selCanvas.nodeName.toUpperCase() === "CANVAS") {
			var explicitWidth = selCanvas.getAttribute("width"),
				explicitHeight = selCanvas.getAttribute("height");

			if (explicitWidth === null) {
				selCanvas.setAttribute("width", w);
			}
			if (explicitHeight === null) {
				selCanvas.setAttribute("height", h);
			}
			ctx = selCanvas.getContext("2d");
		} else {
			newCanvas = document.createElement("canvas");
			newCanvas.setAttribute("width", w);
			newCanvas.setAttribute("height", h);
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
