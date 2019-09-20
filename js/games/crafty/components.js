Crafty.c("Grid", {
    init: function() {
        this.attr({
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
        })
    },

    at: function(x, y) {
        if (x === undefined && y === undefined) {
            return { x: this.x / Game.map_grid.tile.width, y: this.y / Game.map_grid.tile.height }
        }
        else {
            this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
            return this;
        }
    }
});

Crafty.c("Actor", {
    init: function() {
        this.requires("2D, Canvas, Grid");
    }
});

Crafty.c("Obsticle", {
    init: function() {
        this.requires("Actor, Solid, Collision");
    }
});

Crafty.c("Tree", {
    init: function() {
        this.requires("Obsticle, Color")
            .color("rgb(20, 125, 40)");
    }
});

Crafty.c("Bush", {
    init: function() {
        this.requires("Obsticle, Color")
            .color("rgb(20, 185, 40)");
    }
});

Crafty.c("PlayerCharacter", {
    init: function() {
        this.requires("Actor, Fourway, Color, Collision")
            .fourway(20)
            .color("rgb(20, 75, 40)")
            .onHit("Solid", this.blockSolid)
            .onHit("Village", this.visitVillage)
            .bind("Moved", function(evt) {
                console.log("event: " + evt);
                this[evt.axis] = evt.oldValue;
            });
    },

    blockSolid: function(data) {
        var hitDatas, hitData;

        if ((hitDatas = this.hit("Solid"))) {
            hitData = hitDatas[0];

            if (hitData.type === "SAT") {
                this.x -= hitData.overlap * hitData.nx;
                this.y -= hitData.overlap * hitData.ny;
            }
            else {
                this.x = data._x;
                this.y = data._y
            }
        }
    },

    visitVillage: function(data) {
        village = data[0].obj;
        village.collect();
    }
})

Crafty.c("Village", {
    init: function() {
        this.requires("Actor, Color")
            .color("rgb(170, 125, 40)");
    },

    collect: function() {
        this.destroy();
        Crafty.trigger("VillageVisited", this);
    }
})