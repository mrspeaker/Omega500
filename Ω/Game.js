(function (Ω) {

	"use strict";

	var Game = Ω.Class.extend({

		canvas: "body",

		running: false,
		time: 0,

		preset_dt: 1 / 60,
		currentTime: Date.now(),
		accumulator: 0,

		screen: new Ω.Screen(),
		_screenPrev: null,
		_screenFade: 0,
		dialog: null,

		fps: true,

		init: function (w, h) {

			var ctx = initCanvas(this.canvas, w, h),
				self = this;

			Ω.env.w = ctx.canvas.width;
			Ω.env.h = ctx.canvas.height;

			Ω.gfx.init(ctx);
			Ω.input.init(ctx.canvas);

			Ω.evt.onload(function () {
				self.load();
				self.run(Date.now());
			});

			window.addEventListener("load", function () {
				Ω.pageLoad();
			}, false);

            this.running = true;

            // Use the game time, rather than Date.now()
			Ω.utils.now = function () {
				return self.now();
			}

			this.stats = Ω.utils.Stats();

		},

		reset: function () {

			this.time = 0;

		},

		now: function () {

			return this.time * 1000;

		},

		load: function () {},

		run: function () {

            var self = this,
            	now = Date.now(),
                frameTime = Math.min((now - this.currentTime) / 1000, this.preset_dt),
                c;

            this.currentTime = now;
            this.accumulator += frameTime;

            if (this.running) {
                c = 0;
                while (this.accumulator >= this.preset_dt) {
                    c++;
                    this.tick(this.preset_dt);
                    this.accumulator -= this.preset_dt;
                }
                if (c > 1) {
                    console.log("ran " + c + " ticks");
                }

                this.render(Ω.gfx);
            }

            window.requestAnimationFrame(function () {

                self.run(Date.now());

            });

		},

		stop: function () {},

		tick: function (delta) {

			this.stats.start();

			if (this.dialog) {
				this.dialog.tick(delta);
			} else {
				this.time += delta;
				this.screen.loaded && this.screen.tick();
				Ω.timers.tick();
			}
			Ω.input.tick();

			this.stats.stop();

		},

		render: function (gfx) {

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

			if (this.fps) {

				var fps = this.stats.fps();
				gfx.ctx.fillStyle = "rgba(0,0,0,0.3)";
				gfx.ctx.fillRect(this.stats.pos[0], this.stats.pos[1], 50, 20);

				gfx.ctx.fillStyle = "#fff";
				gfx.ctx.font = "6pt monospace";
				gfx.ctx.fillText(fps[0] + " " + fps[1] + "/" + fps[2], this.stats.pos[0] + 5, this.stats.pos[1] + 13);

			}

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
		ctx.imageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;

		if (!ctx) {
			console.error("Could not get 2D context.");
		}

		return ctx;
	}

	Ω.Game = Game;

}(Ω));
