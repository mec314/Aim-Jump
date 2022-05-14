var Global = require("./global");

function Obstacle(params){
    this.pos = {x: params.x, y: params.y};
    this.root = new g.E({scene: Global.scene, x:0.0, y:0.0});

    this.spr = new g.FilledRect({
        scene: Global.scene,
        width: Global.TILE_WIDTH, 
        height: Global.TILE_HEIGHT,
        cssColor: "black",
        anchorX:0, anchorY:0,
        touchable: true,
        x: this.pos.x, y:this.pos.y
    });

    this.root.append(this.spr);
}

Obstacle.prototype.update = function(){
    this.spr.x = this.pos.x;
    this.spr.y = this.pos.y - Global.player_y ;
    this.spr.modified();
}

module.exports = Obstacle;