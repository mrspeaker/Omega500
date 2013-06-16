(function (Ω) {

	"use strict";

	var sounds = {},
		Sound;

	Sound = Ω.Class.extend({

		ext: document.createElement('audio').canPlayType('audio/mpeg;') === "" ? ".ogg" : ".mp3",

		init: function (path, volume, loop) {

			if (sounds[path]) {
				self.audio = sounds[path];
				return;
			}

			var audio = new window.Audio(),
				resolve = Ω.preload(),
				onload = function () {
					this._loaded = true;
					resolve();
				};

			audio.src = path.indexOf(".") > 0 ? path : path + this.ext;

			audio.volume = volume || 1;
			audio._volume = audio.volume;
			audio._loaded = false;
			audio.loop = loop;

			audio.addEventListener("canplaythrough", onload, false);
			audio.addEventListener("error", function () {
				console.error("Error loading audio resource:", audio.src);
				onload.call(this);
			});
			audio.load();

			this.audio = audio;

			sounds[path] = audio;

		},

		rewind: function () {

			this.audio.pause();
			try{
	        	this.audio.currentTime = 0;
	    	} catch(err){
	        	//console.log(err);
	    	}

		},

		play: function () {

			this.rewind();
			this.audio.play();
		}

	});

	Sound._reset = function () {

		// Should check for canplaythrough before doing anything...
		for (var path in sounds) {
			sounds[path].pause();
			try {
				sounds[path].currentTime = 0;
			} catch (err) {
				console.log("err");
			}
		}
	};

	Sound._setVolume = function (v) {

		for (var path in sounds) {
			sounds[path].pause();
			try {
				sounds[path].volume = sounds[path]._volume * v;;
			} catch (err) {
				console.log("err");
			}
		}

	};

	Ω.Sound = Sound;

}(Ω));
