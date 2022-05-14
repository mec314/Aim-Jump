var Global = require("./global");

let font = new g.DynamicFont({
    game: g.game,
    fontFamily: "sans-serif",
    size: 80,
    //fontWeight: "bold"
});

function Background(){

    this.root = new g.E({scene: Global.scene, x:0.0, y:0.0})
    this.background = new g.FilledRect({
        scene: Global.scene,
        width: g.game.width, 
        height: 32*g.game.height,
        cssColor: Global.color,
        y: -32*g.game.height,
        anchorY:1.0
      });
 
    this.root.append(this.background);

    for(var i = 0; i<30; i++){
        let bold_line = new g.FilledRect({
            scene: Global.scene,
            width: g.game.width, 
            height: 10,
            cssColor: "#9E9E9E",
            y: -i*g.game.height + 32*g.game.height
        });

        this.background.append(bold_line);

        let score_label = new g.Label({
            scene: Global.scene,
            font: font,
            text:  10*i + "M",
            fontSize: 40,
            textColor: "black",
            x: g.game.width-100,
            y: -i*g.game.height -50 + 32*g.game.height
        });
        this.background.append(score_label);
    

        for(var j=0; j<10; j++){
            let thin_line = new g.FilledRect({
                scene: Global.scene,
                width: g.game.width, 
                height: 2,
                cssColor: "#9E9E9E",
                y: -(i+0.1*j)*g.game.height + 32*g.game.height
            });
            this.background.append(thin_line);
        }
    }

    let goal_label = new g.Label({
        scene: Global.scene,
        font: font,
        text:  "Goal",
        fontSize: 60,
        textColor: "black",
        x: g.game.width/2,
        y: -21*g.game.height + 32*g.game.height,
        anchorX:0.5, anchorY:0.5
    });
    this.background.append(goal_label);

}

Background.prototype.update = function(){
    this.background.y = - Global.player_y;// + 32*g.game.height;
    this.background.modified();
}

module.exports = Background;