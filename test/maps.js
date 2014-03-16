(function (Ω, QUnit) {

    "use strict";

    var module = QUnit.module,
        test = QUnit.test,
        equal = QUnit.equal,
        notEqual = QUnit.notEqual,
        deepEqual = QUnit.deepEqual,
        ok = QUnit.ok;

    var cellW = 10,
        cellH = 10;

    module("Maps");

    test("Map hit.", function () {
        var map,
            ent,
            hitX,
            hitY;

        Ω.gfx.init((document.createElement("canvas")).getContext("2d"));

        map = new Ω.DebugMap(cellW, cellH, 1, 1,
            [
                [1, 1, 1],
                [1, 0, 1],
                [1, 1, 1]
            ]);

        ent = new (Ω.Entity.extend({
            w: 8,
            h: 8,
            hitBlocks: function (xb, yb) {
                hitX = xb;
                hitY = yb;
            }
        }))(cellW, cellH);

        ent.move(0, 1, map);
        ok(!hitX && !hitY, "Entity doesn't collide with map");

        ent.move(0, -2, map);

        deepEqual(hitX, null, "Move doesn't hit X blocks");
        deepEqual(hitY, [1, 0, 1, 0], "Move hits Y blocks");
    });

    test("Entity taller than cell height should still collide", function () {
        var map,
            ent,
            hitX,
            hitY;

        Ω.gfx.init((document.createElement("canvas")).getContext("2d"));

        map = new Ω.DebugMap(cellW, cellH, 1, 1,
            [
                [0, 0, 0],
                [0, 1, 0],
                [0, 0, 0]
            ]);

        ent = new (Ω.Entity.extend({
            w: 8,
            h: cellH + 2,
            hitBlocks: function (xb, yb) {
                hitX = xb;
                hitY = yb;
            }
        }))(0, cellH - 1);

        ent.move(2, 0, map);
        ok(!hitX && !hitY, "Entity doesn't collide with empty cells");

        ent.move(1, 0, map);
        ok(hitX || hitY, "Entity should collide with overlapped cell [known issue!]");
    });


}(
    window.Ω,
    window.QUnit
));
