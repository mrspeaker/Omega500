(function (Ω) {

	"use strict";

	var sounds = {},
		Sound;

	Sound = Ω.Class.extend({

		init: function (path, volume, loop) {

			if (sounds[path]) {
				self.audio = sounds[path];
				return;
			}

			var audio = new window.Audio(),
				resolve = Ω.preload();

			audio.src = path + this.ext;
			audio.volume = volume || 1;
			audio._volume = audio.volume;
			audio._loaded = false;
			audio.loop = loop;

			audio.addEventListener("canplaythrough", function (){
				audio._loaded = true;
				resolve();
			});
			audio.load();

			this.audio = audio;

			sounds[path] = audio;

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
