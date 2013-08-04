# Ω500: Game thingo.

v0.2 by Mr Speaker.

*See the things!* http://mrspeaker.github.io/Omega500/
*Read the codez!* https://github.com/mrspeaker/Omega500/

Simple framework for me to make 2D canvas-based games. Checkout the code in /ex for an example how to use it (or play some games I've made with it... DIGIBOTS & CO. http://www.mrspeaker.net/dev/game/digibots / https://github.com/mrspeaker/digibots or my LD#26 entry: http://mrspeaker.net/dev/ld26 / https://github.com/mrspeaker/ld26). Included in the library so far:

- Main game loop
- Screens, dialogs, and transitions
- Input handling - keys, mouse, iCade
- Image loading and display
- SpriteSheet animations
- Tile and isometric maps
- Entity/Map and Entity/Entity collisions
- Camera'd map, Tracked camera (with box)
- Audio load/play
- Math/random/timer helpers
- Asset preloader/progress
- Simple (VERY simple) particle controller
- Raycast against maps
- Text helpers
- Spring algo (for camera & entities)
- Shake effect
- State machine helper
- Font plotter (very specific! fix this)
- "Tiled" map editor level support
- Repeating maps, with parallax

Infinite amount of things to add/fix. Stay tuned as I slowly add them. Highest priority and WIP:

- BUG: bad map collision if entity taller than block
- Sprite: Custom bounding box

Lower priority:

- Input: touch handling
- Physics: gravity
- Physics: platform functions
- Partial loader (don't load all resources on init - maybe "no preload" flag)
- Gfx: dirty rects
- Physics: quadtree or map-by-map ents
- Gfx: Flip drawing
- Gfx: Fullscreen canvas
- Gfx: fullscreen resizing
- Math: add smoothstep/lerp helper
- Support: FPS count
- Support: Work in Ejecta
- Support: Mobile compatibility
- Multiple screens (as layers)

Maybe later:

- Input: Game controller support
- Input: mouse lock API
- Gfx: DSP on spritesheets
- Math: pathfinding algo
- Math: Swarm/flock algo
- Maps: block selecting (iso)
- Support: fullscreen API
- GUI: custom mouse pointer
- GUI: button
- "Post" effects in webgl (see DIGIBOTS & CO.)

## inFAQ:

Q. How do you do that omega symbol thing?
A. Ω symbol is alt-z, on a mac. I promise to change this stupid name if the lib becomes any good.

Q. When do we get a version bump?
A. Every time I finish a game with it. Version 1.0 in 8 more games!

## Docs

Check the examples.

### General idea/notes

Old-school, super-simple architecture: Everything has `tick` and `render(gfx)` methods. Each object manages its children and passes these calls on so the entire heirachy receives the messages. Everyone gets ticked, then rendered.

    .           game
    .            |
    .       level screen
    .            |
    .      ___ level __
    .     |      |     |
    .  player baddies  map
    .     |
    .  bullets

Every loop the engine calls "tick" on the main game object. This calls "tick" on its current screen. The screen (manually) calls "tick" on its main child object (level). Level (manually) calls "tick" on its children (player, all the baddies in the baddie array, map) and so on. Once the tick is done, the same thing happens with "render". I might generalise this later, so evertying really has a concept of "children", but for now it's good enough.

Most of the components in Ω500 are in their most basic form - just good enough for me to use as a base for writing games. As I need features, I add them - but it means some stuff only works in one situtation. For example, spritesheets can't contain any margins; no custom bounding boxes etc. These are all easy to fix, but because I'm focusing on finishin' games - it'll take a while before I address everything. Also, it explains why you there are some weirder functions - like map ray casting... because I needed them!


### Ω.Game

Extend `Ω.Game` to create ya game. If you need to do stuff in init, don't forget to pass the width and height arguments up to the super class:

    var game = Ω.Game.extend({

    	init: function (w, h) {

    		this._super(w, h);

    	},

    	load: function () {

    		// Called when all resources have loaded

    	}

    });

    new game(640, 480);

The Game super class has some boilerplate, such as accepting a "screen" object to display as well as the "tick" and "render" methods described above (you can override them of course).

Canvas/DOM container:

The `canvas` property to sets the game canvas: can be a CSS selector to either the canvas element you want to use, or the containing element you want the canvas to be created inside of. Defaults to `"body"`. If an explicit width or hieght is set on the canvas element this will be used, otherwise it will use the values passed in - or defualt to 400x250.

### Entity

has x, y, width and height (w, h)

### Screen

A scene to display stuff in. You don't reallly need it but it's helpful. Also has a small fade transition between screens:

    game.setScreen(new TitleScreen());

If you need to do async stuff on load, then set the screen's `loaded` property to false. When you're done, set it to true.

    this.clear("#333"); // for clearing


### Input

Bind keys to "actions". The actions are just strings that make sense for your game... "fire", "jump", "decapitate"... whatever... You match the keycode (or a label like "up", "down" - see Ω.input for the list) to the action:

	Ω.input.bind([
		["space", "fire"],
		["escape", "escape"],
		["left", "left"],
		["right", "right"],
		["up", "up"],
		["down", "down"]
	]);

This lets you have multiple keys bind to the same action.

Then to test:

	if (Ω.input.pressed("fire")) {
		// Fire button pressed
	}

Also: released (== wasDown && !isDown), isDown, wasDown, release (forces a key to be released)

### Image

### Sound

If you don't put an extension it'll choose .mp3 if supported, else .ogg

### SpriteSheet

Specify tile sheet, tile w and tile h.

	var sheet = new Ω.SpriteSheet("res/chars.png", 25, 45);

To draw a tile:

	sheet.render(gfx, frameX, frameY, posX, posY);

### Animation

### Map

Usually give it a camera to render

### Dialog

Overlay for displaying menus etc.

    game.setDialog(new Ω.Dialog())

Time stops when dialogs are up.
Customiseable "kill key" to remove it.

### Camera

Camera lets you define a viewport and draws only a small part of the world at a time. Pass in anything you want to draw to the camera and it'll be rendered in the correct world location.

It accepts an array of entities, or arrays of entities to render. They are drawn using the painters alogrithm:

    // Camera at pos 0, 0 with viewport size 320x240.
    var camera = new Ω.Camera(0, 0, 320, 240);

    // Draw the map, player and baddies (anything with a render function!)
    camera.render(gfx, [map, player, baddies]);

There's also a TrackingCamera that will follow the entity you pass to it.


### Preloading

### Ray casting

### Effects


