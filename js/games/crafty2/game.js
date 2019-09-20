Game = {
    map_grid: {
        width: 24,
        height: 32,
        tile: {
            width: 16,
            height: 16
        }
    },

    width: function () {
        return this.map_grid.width * this.map_grid.tile.width;
    },

    height: function () {
        return this.map_grid.height * this.map_grid.tile.height;
    },

    start: function () {
        Crafty.init(Game.width(), Game.height() / 2);
        Crafty.background("rgb(249, 223, 125)");
        Crafty.scene("Loading");
    }
}

$text_css = { "font-size": "24px", "font_family": "Arial", "color": "white", "text-align": "center" }
