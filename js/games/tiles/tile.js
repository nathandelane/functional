function Tile() {

    let tile = Object.create(Tile.prototype);

    tile.dimensions = { "width": 16, "height": 16 };

    tile.image = new Image();
    tile.image.src = "./Tile_16x16.png";

    return tile;

}

Tile.prototype.render = function (g2d, x, y) {
    g2d.drawImage(this.image, 0, 0, 16, 16, x, y, 16, 16);
}