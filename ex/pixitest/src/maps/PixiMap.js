(function (Ω) {

    "use strict";

    var PixiMap = Ω.Map.extend({

        init: function (sheet, texture, cells, walkable) {
            this._super(sheet, cells, walkable);
            this.texture = texture;

            this.doc = new PIXI.DisplayObjectContainer();
            this.doc.filters = [new PIXI.GrayFilter()];
            game.addChild(this.doc);

            this.rendera(Ω.gfx);

            this.pool = {};

        },

        render: function (gfx, camera) {
            this._super(gfx, camera);

            this.doc.x = -camera.x | 0;
            this.doc.y = -camera.y | 0;
        },

        getTile: function (cellX, cellY) {
            // Get a tile from the pool
        },

        rendera: function (gfx, camera) {

            if (!camera) {
                camera = {
                    x: 0,
                    y: 0,
                    w: gfx.w,
                    h: gfx.h,
                    zoom: 1
                };
            }

            // TODO: implement some kind of object pool for tiles
            // and upate dynamically  based on the viewport.

            var tw = this.sheet.w,
                th = this.sheet.h,
                cellW = this.sheet.cellW,
                cellH = this.sheet.cellH,
                stx = 0, //(camera.x - (camera.x * this.parallax)) / tw | 0,
                sty = 0, //(camera.y - (camera.y * this.parallax)) / th | 0,
                endx = this.w * tw,//stx + (camera.w / camera.zoom / tw | 0) + 1,
                endy = this.h * th, //sty + (camera.h / camera.zoom / th | 0) + 1,
                j,
                i,
                cell;

            for (j = sty; j <= endy; j++) {
                if (j < 0 || !this.repeat && j > this.cellH - 1) {
                    continue;
                }
                for (i = stx; i <= endx; i++) {
                    if (i < 0 || !this.repeat && i > this.cellW - 1) {
                        continue;
                    }

                    cell = this.cells[j % this.cellH][i % this.cellW];
                    if (cell === 0) {
                        continue;
                    }

                    var tile = new PIXI.TilingSprite(this.texture, 64, 64);
                    tile.x = i * tw;
                    tile.y = j * th;
                    tile.tilePosition.x = -((cell - 1) % cellW  | 0) * tw;
                    tile.tilePosition.y = -((cell - 1) / cellW | 0) * th;
                    this.doc.addChild(tile);
                }
            }

        },


    });

    window.PixiMap = PixiMap;

}(window.Ω));
