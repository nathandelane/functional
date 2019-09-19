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

Crafty.c("Tree", {
    init: function() {
        this.requires("Actor, Color, Solid")
            .color("rgb(20, 125, 40)");
    }
});

Crafty.c("Bush", {
    init: function() {
        this.requires("Actor, Color, Solid")
            .color("rgb(20, 185, 40)");
    }
});

Crafty.c("PlayerCharacter", {
    init: function() {
        this.requires("Actor, Fourway, Color, Collision")
            .fourway(20)
            .color("rgb(20, 75, 40)")
            // .stopOnSolids()
            .onHit("Solid", this.blockSolid)
            .onHit("Village", this.visitVillage)
            .bind("Moved", function(evt) {
                console.log("event: " + evt);
                this[evt.axis] = evt.oldValue;
            });
    },

    stopOnSolids: function() {
        this.onHit("Solid", this.stopMovement);

        return this;
    },

    stopMovement: function() {
        console.log("speed: " + this._speed + " x: " + this.x + " y: " + this.y + " movement.x:" + this._movement.x + " movement.y" + this._movement.y);

        this._speed = 0;

        if (this._movement) {
            this.x -= this._movement.x;
            this.y -= this._movement.y;
        }
    },

    blockSolid: function(data) {
        console.log("data: " + data);
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