const Enemy = require("./enemy");
const Enemy2 = require("./enemy2");
var Global = require("./global");

function EnemyManager(map) {
    this.map = map;
    this.enemies = [];
    this.params = this.map_to_params();
}

EnemyManager.prototype.map_to_params = function(){
    let params = [];
    for(var i=0; i< this.map.length; i++){
        for(var j=0; j<this.map[0].length; j++){
            if(this.map[i][j]==2 || this.map[i][j]==3){
                let param = [{x: j*Global.TILE_WIDTH, y:-i*Global.TILE_HEIGHT},this.map[i][j]];
                params.push(param)
            }
        }
    }
    return params;
}
    

EnemyManager.prototype.setup = function(){
    var len = this.params.length;
    for(var i=0; i< len; i++){
        let param = this.params[i];
        let enemy;
        if(param[1] == 2){
            enemy = new Enemy(param[0]);
            Global.scene.append(enemy.root);
        }
        if(param[1] == 3){
            enemy = new Enemy2(param[0]);
            Global.scene.append(enemy.root);
        }
        this.enemies.push(enemy);
        //Global.scene.append(enemy.root);
    }
}

EnemyManager.prototype.update = function() {
    var len = this.enemies.length;
    for (var i = 0; i < len; i++) {
        var e = this.enemies[i];
        e.update();
    }
};

module.exports = EnemyManager;