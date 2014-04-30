(function (Ω) {

    "use strict";

    var Tiled = Ω.Class.extend({

        w: null,
        h: null,
        tileW: null,
        tileH: null,

        layers: null,

        init: function (file, onload) {

            var self = this;

            this.layers = [];
            this.onload = onload;

            // TODO: make sure not cached!
            Ω.utils.ajax(file, function (xhr) {

                // TODO: handle xhr errors
                self.processLevel(JSON.parse(xhr.responseText));

            });
        },

        layer: function (name) {

            var layer = Ω.utils.getByKeyValue(this.layers, "name", name),
                tileH = this.tileH,
                adjustYPos = function (obj) {
                    // Weird thing of Tiled when stamping objects
                    if (obj.width === 0 && obj.height === 0) {
                        obj.y -= tileH;
                    }
                    return obj;
                }

            return {
                get: function () {
                    return layer;
                },
                // Might add "optional" param and throw error if not found by default.
                // Maybe param can be bool (if true, ok to be undefined - else if func, run it - else return as value
                name: function (selector, defaultTo) {
                    var objs = layer.data.filter(function (obj) {
                            return obj.name === selector;
                        })
                        .map(adjustYPos);
                    return objs.length ? objs[0] : defaultTo;
                },
                type: function (selector, defaultTo) {
                    var objs = layer.data.filter(function (obj) {
                            return obj.type === selector;
                        })
                        .map(adjustYPos);

                    return objs.length === 0 && defaultTo ? defaultTo : objs;
                }
            }
        },

        processLevel: function (json) {
            this.raw = json;

            this.w = json.width;
            this.h = json.height;
            this.tileW = json.tilewidth;
            this.tileH = json.tileheight;

            this.properties = json.properties;

            this.layers = json.layers.map(function (l) {

                var data;
                if (l.type === "tilelayer") {
                    // convert to 2d arrays.
                    data = l.data.reduce(function (acc, el) {
                        if (acc.length === 0 || acc[acc.length - 1].length % json.width === 0) {
                            acc.push([]);
                        }
                        acc[acc.length - 1].push(el);
                        return acc;
                    }, []);
                } else {
                    // Parse the objects into something useful
                    data = l.objects.map(function (o) {
                        return o;
                    });
                }

                return {
                    name: l.name,
                    type: l.type,
                    data: data,
                    opacity: l.opacity,
                    visible: l.visible
                };

            });

            if (this.onload) {
                this.onload(this);
            }
        }

    });

    Ω.Tiled = Tiled;

}(Ω));
