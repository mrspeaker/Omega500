(function (Ω) {

	"use strict";

	var sounds = {},
		Sound;

	Sound = Ω.Class.extend({

		init: function (path, volume, loop) {

			var audio = new window.Audio();

			audio.src = path;
			audio.volume = volume || 1;
			audio.loop = loop;

			// FIXME: add to preload list
			audio.addEventListener("canplaythrough", (function (){
				return Ω.env.preload();
			}()));
			audio.load();

			this.audio = audio;

		},

		rewind: function () {

			// this.pause();
			this.currentTime = 0;

		},

		play: function () {

			this.rewind();
			this.audio.play();
		}

	});

	Ω.Sound = Sound;

}(Ω));
