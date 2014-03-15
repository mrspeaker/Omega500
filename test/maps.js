(function (Ω, QUnit) {

    "use strict";

    var module = QUnit.module,
        test = QUnit.test,
        equal = QUnit.equal,
        notEqual = QUnit.notEqual,
        deepEqual = QUnit.deepEqual,
        ok = QUnit.ok;

    module("Maps");

    test("Map hit.", function () {
        var map,
            ent,
            hitX,
            hitY;

        Ω.gfx.init((document.createElement("canvas")).getContext("2d"));

        map = new Ω.DebugMap(10, 10, 1, 1,
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
        }))(10, 10);

        ent.move(0, 1, map);
        ok(!hitX && !hitY, "Entity doesn't collide with map");

        ent.move(0, -2, map);

        deepEqual(hitX, null, "Move doesn't hit X blocks");
        deepEqual(hitY, [1, 0, 1, 0], "Move hits Y blocks");
    });


}(
    window.Ω,
    window.QUnit
));
