(function (Ω) {

	"use strict";

	var Node,
		QuadTree;

	QuadTree = Ω.Class.extend({

		init: function (bounds, maxItems, maxDepth) {

			maxItems = maxItems || 3;
			maxDepth = maxDepth || 4;

			this.root = Node(bounds, 0, maxItems, maxDepth);

		},

		retrieve: function (item) {

			return this.root.retrieve(item);

		},

		insert: function (item) {

			this.root.insert(item);

		},

		clear: function (node) {

			this.root.clear();

		},

		render: function (gfx) {

			this.root.render(gfx);

		}


	});

	Node = function (bounds, depth, maxItems,  maxDepth) {

		var nodes = [],
			items = [];

		return {

			bounds: bounds,
			depth: depth,

			retrieve: function (item) {

				var output = [];

				output = output.concat(items);

				if (nodes.length) {
					var found = nodes[this.findQuadrant(item)].retrieve(item);
					output = output.concat(found);
				}

				return output;

			},

			insert: function (item) {

				var quad;

				if (nodes.length) {
					quad = this.findInsertNode(item);
					if (quad < 0) {
						items.push(item);
					} else {
						nodes[quad].insert(item);
					}

				} else {
					items.push(item);
					if (items.length > maxItems && depth < maxDepth) {

						this.split();

					}
				}

			},

			split: function () {

				var w = bounds.w / 2,
					h = bounds.h / 2,
					newDepth = depth + 1;

				[[0, 0], [0, h], [w, 0], [w, h]].forEach(function (node) {

					nodes.push(Node({
							x: bounds.x + node[0],
							y: bounds.y + node[1],
							w: w,
							h: h
						},
						newDepth,
						maxItems,
						maxDepth));

				});

				items = items.filter(function (item) {

					this.insert(item);
					return false;

				}, this);

			},

			clear: function () {

				nodes && nodes.forEach(function (n) {
					n.clear();
				});

				items.length = 0;
				nodes.length = 0;
			},

			findQuadrant: function (item) {

				var quad;

				if (item.x < bounds.x + bounds.w / 2) {
					quad = item.y < bounds.y + bounds.h / 2 ? 0 : 1;
				}
				else {
					quad = item.y < bounds.y + bounds.h / 2 ? 2 : 3;
				}

				return quad;

			},

			findInsertNode: function (item) {

				var quad = -1; // Default to parent node

				if (item.x + item.w < bounds.x + bounds.w / 2) {
					if (item.y + item.h < bounds.y + bounds.h / 2) {
						quad = 0;
					}
					if (item.y >= bounds.y + bounds.h / 2) {
						quad = 1;
					}
				}

				if (item.x >= bounds.x + bounds.w / 2) {
					if (item.y + item.h < bounds.y + bounds.h / 2) {
						quad = 2;
					}
					if (item.y >= bounds.y + bounds.h / 2) {
						quad = 3;
					}
				}

				return quad;

			},

			render: function (gfx) {

				var c = gfx.ctx;

				c.strokeStyle = "#fff";
				c.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);

				nodes && nodes.forEach(function (node) {
					node.render(gfx);
				});

			}

		}

	};

	Ω.utils.QuadTree = QuadTree;

}(Ω));
