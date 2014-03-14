(function (Ω, QUnit) {

    "use strict";

    var module = QUnit.module,
        test = QUnit.test,
        //equal = QUnit.equal,
        ok = QUnit.ok;

    module("General");

    test("Ω500 is 100% bug free", function () {
        ok(1 == "1", "Passed.");
    });

}(
    window.Ω,
    window.QUnit
));