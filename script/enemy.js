var Global = require("./global");

function Enemy(params){
    this.pos = {x: params.x, y: params.y};
    this.root = new g.E({scene: Global.scene, x:0.0, y:0.0});
    this.sound = "sound";

    
    this.spr = new g.Sprite({
        scene: Global.scene,
        src: Global.scene.asset.getImageById("target"),
        width: 758, 
        height: 758,
        cssColor: "white",
        anchorX:0, anchorY:0,
        touchable: true,
        x: this.pos.x, y:this.pos.y
    })
    this.spr.scale(0.1);
    

    this.root.append(this.spr);
    this.setup();
}

Enemy.prototype.setup = function(){
    let _this = this;
    this.spr.onPointDown.add(function() {
        if(Global.grapple == false){
            Global.grapple = true;
            Global.target_pos = {x: _this.pos.x, y:_this.pos.y};
        }
        let sound = Global.scene.asset.getAudioById(_this.sound).play();
        sound.changeVolume(0.5);
    });
}

Enemy.prototype.update = function(){
    this.spr.x = this.pos.x;
    this.spr.y = this.pos.y - Global.player_y ;
    this.spr.modified();
}

module.exports = Enemy;