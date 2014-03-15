(function (Ω, QUnit) {

    "use strict";

    var module = QUnit.module,
        test = QUnit.test,
        equal = QUnit.equal,
        notEqual = QUnit.notEqual,
        ok = QUnit.ok;

    module("Math");

    test("Ω.rotate rotates", function () {
        var p = [1, 1],
            rot = Ω.math.rotate(Math.PI, p);

        rot[0] = Math.round(rot[0]);
        rot[1] = Math.round(rot[1]);

        deepEqual(rot, [-1, -1], "Rotate a point by PI.");
    });


}(
    window.Ω,
    window.QUnit
));
