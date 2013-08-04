# Ω500: JS Game Library

v0.2 by Mr Speaker. Ω500 is a simple framework for me to make 2D canvas-based games. Check out the online examples and games: http://mrspeaker.github.io/Omega500/.

![Platform example](http://www.mrspeaker.net/images/omegaPlat.png)

## Some games using Ω500

[DIGIBOTS & CO](http://www.mrspeaker.net/dev/game/digibots): inside-out Lemmings game where you need to build a path to complete the level. Finalist in the NoFuture contest where it's to become a real-life arcade machine. Neat-o! [Source on GitHub](https://github.com/mrspeaker/digibots)

![DIGIBOTS & CO](http://www.mrspeaker.net/images/omegaDigibots.jpg?a=1)

[Zmore](http://mrspeaker.net/dev/ld26): LD#26 entry on the theme "minimalism". Turn light into darkness and escape minimalist captivity [Source on GitHub](https://github.com/mrspeaker/ld26)

![Zmore](http://www.mrspeaker.net/images/omegaZmore.png)

## Included in the library so far:

- Main game loop
- Screens, dialogs, and transitions
- Input handling - keys, mouse, iCade
- Image loading and display
- SpriteSheet animations
- Tile and isometric maps
- Repeating maps, with parallax
- Entity/Map and Entity/Entity collisions
- Entity gravity/falling
- Camera'd map, Tracked camera (with box)
- Audio load/play
- Math/random/timer helpers
- Asset preloader/progress
- Simple particle controller
- Raycast against maps
- Text helpers
- Font plotter (very specific! fix this)
- State machine helper
- "Tiled" map editor level support
- Flipped spritesheets and images
- Spring algo (for camera & entities)
- Shake effect

Infinite amount of things to add/fix. Stay tuned as I slowly add them. Highest priority and WIP:

- BUG: bad map collision if entity taller/wider than block
- Sprite: Custom bounding box

Lower priority:

- Input: touch handling
- Partial loader (don't load all resources on init - maybe a "no preload" flag)
- GUI: button
- Gfx: Fullscreen canvas
- Gfx: screen resizing
- Math: add smoothstep/lerp helper
- Support: FPS count
- Support: Work in Ejecta
- Support: Mobile compatibility
- Multiple screens (as layers)

Maybe later:

- Input: Game controller support
- Input: mouse lock API
- Gfx: DSP on spritesheets
- Gfx: dirty rect optimisations
- Physics: quadtree or map-by-map ents
- Math: pathfinding algo
- Math: Swarm/flock algo
- Maps: block selecting (iso)
- Support: fullscreen API
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

optional param: flipFlags: only flip x = 1, only flip y = 2, flip both=3

    new Ω.SpriteSheet("res/chars.png", 25, 45, 3)

This will create a spritesheet twice as wide, and twice as high as the original. The top left part of the sheet will be the original sprites. The top right will have each cell flipped horizontally. The bottom left will have each cell flipped verticallys, and the bottom right will be flipped both horizonatlly and vertically.


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


