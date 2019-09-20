Crafty.scene("Game", function () {

    // A 2D array to keep track of all occupied tiles
    this.occupied = new Array(Game.map_grid.width);

    for (var i = 0; i < Game.map_grid.width; i++) {
        this.occupied[i] = new Array(Game.map_grid.height);

        for (var y = 0; y < Game.map_grid.height; y++) {
            this.occupied[i][y] = false;
        }
    }

    // Player character, placed at 5, 5 on our grid
    this.player = Crafty.e("PlayerCharacter").at(5, 5);

    this.occupied[this.player.at().x][this.player.at().y] = true;

    // Place a tree at every edge square on our grid of 16x16 tiles
    for (var x = 0; x < Game.map_grid.width; x++) {
        for (var y = 0; y < Game.map_grid.height; y++) {
            var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;

            if (at_edge) {
                // Place a tree entity at the current tile
                Crafty.e("Tree").at(x, y);

                this.occupied[x][y] = true;
            }
            else if (Math.random() < 0.06 && !this.occupied[x][y]) {
                // Place a bush entity at the current tile
                Crafty.e("Bush").at(x, y);

                this.occupied[x][y] = true;
            }
        }
    }

    // Generate up to five villages on the map in random locations
    var max_villages = 5;

    for (var x = 0; x < Game.map_grid.width; x++) {
        for (var y = 0; y < Game.map_grid.height; y++) {
            if (Math.random() < 0.02) {
                if (Crafty("Village").length < max_villages && !this.occupied[x][y]) {
                    Crafty.e("Village").at(x, y);
                }
            }
        }
    }

    this.show_victory = this.bind("VillageVisited", function () {
        if (!Crafty("Village").length) {
            Crafty.scene("Victory");
        }
    });

}, function () {
    this.unbind("VillageVisited", this.show_victory);
});

Crafty.scene("Victory", function () {
    Crafty.e("2D, DOM, Text")
        .attr({ x: 0, y: 0 })
        .text("Victory!");

    this.restart_game = this.bind("KeyDown", function () {
        Crafty.scene("Game");
    });
}, function () {
    this.unbind("KeyDown", this.restart_game);
});

Crafty.scene("Loading", function() {
    Crafty.e("2D, DOM, Text")
        .text("Loading...")
        .attr({ x: 0, y: Game.height() / - 24, w: Game.width() })
        .css($text_css);

    var assetsObj = {
        "sprites": {
            "assets/16x16_forest_1.png": {
                tile: 16,
                tileh: 16,
                map: {
                    spr_tree: [0, 0],
                    spr_bush: [1, 0],
                    spr_village: [0, 1],
                    spr_player: [1, 1]
                }
            }
        }
    };
    
    Crafty.load(assetsObj, function() {
        Crafty.scene("Game")
    });
});
