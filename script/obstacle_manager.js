var Global = require("./global");
var Obstacle = require("./obstacle");

function ObstacleManager(map) {
    this.map = map;
    this.obstacles = [];
    this.params = this.map_to_params();
}

ObstacleManager.prototype.map_to_params = function(){
    //    let params = [{x:100, y:0*g.game.height},{x:1000, y:0*g.game.height},{x:500, y:-0.3*g.game.height}]
    let params = [];
    for(var i=0; i< this.map.length; i++){
        for(var j=0; j<this.map[0].length; j++){
            if(this.map[i][j]==0){
                let param = {x: j*Global.TILE_WIDTH, y:-(i+1)*Global.TILE_HEIGHT};
                params.push(param)
            }
        }
    }
    return params;
}

ObstacleManager.prototype.setup = function(){
    var len = this.params.length;
    for(var i=0; i< len; i++){
        let param = this.params[i];
        let obstacle = new Obstacle(param);
        this.obstacles.push(obstacle);
        Global.scene.append(obstacle.root);
    }
}

ObstacleManager.prototype.update = function() {
    var len = this.obstacles.length;
    for (var i = 0; i < len; i++) {
        var o = this.obstacles[i];
        o.update();
    }
};

module.exports = ObstacleManager;
