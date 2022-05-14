var Global = require("./global");
var GRAVITY_ACC = 1500;
var pc_heigt = 146;
var pc_width = 200;
var scale = 0.5;

function Player(map){
    this.map = map;
    this.immune = false;
    this.time_after_collide = 0;
    this.reset();
    this.root = new g.E({scene: Global.scene, x:0.0, y:0.0});

    this.spr = new g.Sprite({
        scene: Global.scene,
        src: Global.scene.asset.getImageById("player_img"),
        width: pc_width, 
        height: pc_heigt,
        anchorX:0.5, anchorY:0.5,
        touchable: true,
        x: this.x, y:this.y
    })
    this.spr.scale(scale);

    let _this = this;
    this.spr.onPointDown.add(function() {
        _this.vx = 0;
        _this.vy = -1000;
    })

    this.root.append(this.spr);
}

Player.prototype.reset = function(){
    this.x = g.game.width/2;
    this.y = -100;
    this.vx = 0;
    this.vy = 0;
    this.score = 0;
}

Player.prototype.update = function(){
    var dt = 1 / g.game.fps;

    if (Global.grapple) {
        let target_x = Global.target_pos.x;
        let target_y = Global.target_pos.y;
        let diff = Math.sqrt((this.x - target_x)**2 + (this.y - target_y)**2);
        this.vx = -Global.grap_v*(this.x - target_x)/diff;
        this.vy = -Global.grap_v*(this.y - target_y)/diff;
        Global.grapple = false;
    } else {
        var a = { x: 0, y: GRAVITY_ACC };
        this.vx += a.x * dt;
        this.vy += a.y * dt;
    }
    
    let temp = this.is_collision();
    let is_x_collide = temp[0];
    let is_y_collide = temp[1];

    if(!this.immune){
        if(is_y_collide != 0){
            this.immune = true;
            this.vy = 0.6*is_y_collide*Math.abs(this.vy);
            this.vx = 0.95*this.vx;
        }
        if(is_x_collide != 0){
            this.immune = true;
            this.vx = 0.6*is_x_collide*Math.abs(this.vx);
            this.vy = 0.95*this.vy;
        }
        this.immune = false;
    }

    if((is_x_collide == 0) && (is_y_collide == 0)){
        this.immune = false;
    }
    

    if(this.y > g.game.height-100){
        this.y = g.game.height-100;
        this.vy = -0.5*this.vy;
    }
    if(this.y< 0){
     //   this.y = 0;
    }
    if(this.x-pc_width*scale/2 < 0){
        this.x = pc_width*scale/2+5;
        this.vx = -0.5*this.vx;
    }
    if(this.x+pc_width*scale/2 > g.game.width){
        this.x = g.game.width-pc_width*scale/2-5;
        this.vx = -0.5*this.vx;
    }
    
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    Global.player_y = this.y - Global.offset;

    this.spr.x = this.x;
    this.spr.y = this.y - Global.player_y;
    this.spr.modified();

    this.score = Math.min(this.y, this.score);
    g.game.vars.gameState.score = -Math.floor(this.score/g.game.height*10);

    if(g.game.vars.gameState.score >= 210){
        Global.is_goaled = true;
    }

}

Player.prototype.is_collision = function(){
    let map = this.map;
    let x, y;
    let is_x_collide = 0;
    let is_y_collide = 0;

    // top
    x = Math.floor ((Math.abs(this.x))/ Global.TILE_WIDTH);
    y = Math.floor ((Math.abs(this.y-pc_heigt*scale/2))/ Global.TILE_HEIGHT);
    if(map[y][x] == 0){
        is_y_collide = 1;
    }
    // bottom
    x = Math.floor ((Math.abs(this.x))/ Global.TILE_WIDTH);
    y = Math.floor ((Math.abs(this.y+pc_heigt*scale/2))/ Global.TILE_HEIGHT);
    if(map[y][x] == 0){
        is_y_collide = -1;
    }

    //right
    x = Math.floor ((Math.abs(this.x+pc_width*scale/2))/ Global.TILE_WIDTH);
    y = Math.floor ((Math.abs(this.y))/ Global.TILE_HEIGHT);
    if(map[y][x] == 0){
        is_x_collide = -1;
    }   
    //left
    x = Math.floor ((Math.abs(this.x-pc_width*scale/2))/ Global.TILE_WIDTH);
    y = Math.floor ((Math.abs(this.y))/ Global.TILE_HEIGHT);
    if(map[y][x] == 0){
        is_x_collide = 1;
    }

    return [is_x_collide, is_y_collide];
}

module.exports = Player;