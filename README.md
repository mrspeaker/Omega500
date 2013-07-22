# Ω500: Game thingo.

v0.1.2 by Mr Speaker.

*See the things!* http://mrspeaker.github.io/Omega500/
*Read the codez!* https://github.com/mrspeaker/Omega500/

Simple framework for making 2D canvas-based games. Checkout the code in /ex for an example how to use it (or play my LD#26 entry: http://mrspeaker.net/dev/ld26 / https://github.com/mrspeaker/ld26). Included in the library so far:

- [X] Main game loop
- [X] Screens, dialogs, and transitions
- [X] Input handling - keys, mouse, iCade
- [X] Image loading and display
- [X] SpriteSheet animations
- [X] Tile and isometric maps
- [X] Entity/Map and Entity/Entity collisions
- [X] Camera'd map, Tracked camera (with box)
- [X] Audio load/play
- [X] Math/random/timer helpers
- [X] Asset preloader/progress
- [X] Simple particle controller
- [X] Raycast against maps
- [X] Text helpers
- [X] Spring algo (for camera & entities)
- [X] Shake effect

Infinite amount of things to add/fix. Stay tuned as I slowly add them. Highest priority and WIP:

- [ ] BUG: bad map collision if entity taller than block
- [ ] Better system to allow walkable tiles (currently just tile 0)
- [ ] Helpers for loading Tiled levels

Lower priority:

- [ ] Anims: Custom bounding box
- [ ] Input: touch handling
- [ ] Physics: gravity
- [ ] Physics: platform functions
- [ ] Gfx: Flip drawing
- [ ] Gfx: Fullscreen canvas
- [ ] Gfx: fullscreen resizing
- [ ] Math: add smoothstep helper
- [ ] Maps: block selecting (iso)
- [ ] Support: FPS count
- [ ] Support: Work in Ejecta
- [ ] Support: Mobile compatibility

Maybe later:

- [ ] "Post" effects (webgl)
- [ ] Input: Game controller support
- [ ] Input: mouse lock API
- [ ] Gfx: DSP on spritesheets
- [ ] Gfx: Flash effect
- [ ] Gfx: Blur effect
- [ ] Gfx: parralax backgrounds
- [ ] Gfx: destructable terrain masks
- [ ] Math: pathfinding algo (or integrate https://github.com/bgrins/javascript-astar)
- [ ] Math: Swarm/flock algo
- [ ] Maps: multi-layered maps
- [ ] Support: fullscreen API
- [ ] GUI: custom mouse pointer
- [ ] GUI: button


## (in)FAQ:

Q. How do you do that omega symbol thing?
A. Ω symbol is alt-z, on a mac. I promise to change this stupid name if the lib becomes any good.


## Docs

ha ha.

### General idea/notes

Old-school, super-simple architecture: Everything has `tick` and `render(gfx)` methods. Each object manages its children and passes these calls on so the entire heirachy receives the messages. Everyone gets ticked, then rendered.

    .       game
    .        |
    .    level screen
    .        |
    .      level
    .        |
    . player, baddies, map

Every loop the engine calls "tick" on the main game object. This calls "tick" on its current screen. The screen (manually) calls "tick" on its main child object (level). Level (manually) calls "tick" on its children (player, all the baddies in the baddie array, map) and so on. Once the tick is done, the same thing happens with "render".

Most of the components in Ω500 are in their most basic form - just good enough for me to use as a base for writing games. As I need features, I add them - but it means some stuff only works in one situtation. For example, spritesheets can't contain any margins; no custom bounding boxes; only tile 0 is "walkable" in a map. These are all easy to fix, but because I'm focusing on finishin' games - it'll take a while before I address everything. Also, it explains why you there are some weirder functions - like map ray casting... because I needed them!


### Ω.Game

Extend `Ω.Game` to create ya game. If you need to do stuff in init, don't forget to pass the width and height arguments up to the super class:

    var myGame = Ω.Game.extend({

    	init: function (w, h) {

    		this._super(w, h);

    	},

    	load: function () {

    		// Called when all resources have loaded

    	}

    });
    new myGame(640, 480);

The Game super class has some boilerplate, such as accepting a "screen" object to display as well as the "tick" and "render" methods described above (you can override them of course).

Canvas/DOM container:

The `canvas` property to sets the game canvas: can be a CSS selector to either the canvas element you want to use, or the containing element you want the canvas to be created inside of. Defaults to `"body"`. If an explicit width or hieght is set on the canvas element this will be used, otherwise it will use the values passed in - or defualt to 400x250.

### Entity

### Input

Bind keys to "actions"

	Ω.input.bind([
		["space", "fire"],
		["escape", "escape"],
		["left", "left"],
		["right", "right"],
		["up", "up"],
		["down", "down"]
	]);

Then to test:

	if (Ω.input.pressed("fire")) {
		// Fire button pressed
	}

### Image

### Sound

### Screen

	game.setScreen(new TitleScreen());

### SpriteSheet

	var sheet = new Ω.SpriteSheet("res/chars.png", 25, 45);

	sheet.render(gfx, frameX, frameY, posX, posY);

### Animation

### Map

### Dialog

### Camera

### Preloading

### Ray casting

### Effects


