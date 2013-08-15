var editor = {

	init: function () {

		var code = document.querySelector("#code"),
			ed = document.createElement("div"),
			pre = document.createElement("pre"),
			err = document.createElement("div"),
			downTimer = null;


		var snippet = code.innerText.split(/\/\/ \[ed.*\].*((?:.|\r?\n)*?)\/\/ \[\/ed\]/g)[1];

		pre.innerText = snippet;

		ed.addEventListener("keyup", function (e) {

			if([37,38,39,40, 91,93, 16,17,18].indexOf(e.keyCode) >= 0) {
				return;
			}

			clearTimeout(downTimer);
			downTimer = setTimeout(function () {

				var updatedCode = ed.innerText;

				try {
					err.innerText = "";
					(function () {
						eval.call(window, updatedCode);
					}());
					game.init();
				} catch (e) {
					err.innerText = e.message;
				}

			}, 500);

		}, false);

		pre.style.font = "8pt monospace";
		err.style.font = "8pt monospace";

		err.style.position = "absolute";
		err.style.bottom = "0px";
		err.style.left = "0";

		err.style.color = "#800";

		ed.setAttribute("contenteditable", true);
		ed.style.position = "absolute";
		ed.style.bottom = "0";
		ed.style.left = "0";
		ed.style.right = "0";
		ed.style.borderTop = "1px solid #333";
		ed.style.background = "rgba(0,0,0,0.1)";
		ed.style.height = "300px";
		ed.style.overflow = "auto";

		ed.appendChild(pre);
		document.body.appendChild(ed);
		document.body.appendChild(err);
	}

};

window.addEventListener("load", function () {

	editor.init();

}, false);