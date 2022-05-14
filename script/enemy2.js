var Global = require("./global");

function Enemy2(params){
    this.pos = {x: params.x, y: params.y};
    this.root = new g.E({scene: Global.scene, x:0.0, y:0.0});
    this.phase = g.game.random.generate();
    this.sound = "sound";

    
    this.spr = new g.Sprite({
        scene: Global.scene,
        src: Global.scene.asset.getImageById("target2"),
        width: 570, 
        height: 570,
        anchorX:0.5, anchorY:0.5,
        touchable: true,
        x: this.pos.x, y:this.pos.y
    })
    this.spr.scale(0.15);
    

    this.root.append(this.spr);
    this.setup();
}

Enemy2.prototype.setup = function(){
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

Enemy2.prototype.update = function(){
    let time = Global.time;
    this.spr.x = this.pos.x + 200*Math.sin(2*time+Math.PI*this.phase);
    this.spr.y = this.pos.y - Global.player_y ;
    this.spr.modified();
}

module.exports = Enemy2;