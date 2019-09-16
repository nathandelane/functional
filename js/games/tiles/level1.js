function Level1() {
    
    let level1 = Object.create(Level1.prototype);

    level1.tileMap = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ]

    return level1;

}

Level1.prototype.render = function (g2d) {
    for (var i = 0; i < 30; i++) {
        for (var j = 0; j < this.tileMap.length / 30; j++) {
            if (this.tileMap[i * j] === 1) {
                var tile = new Tile();
                tile.render(g2d, i * 30, j * 30);
            }
        }
    }
}