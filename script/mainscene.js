var Global = require("./global");
var EnemyManager = require("./enemy_manager");
var ObstacleManager = require("./obstacle_manager");
var Player = require("./player");
var Background = require("./background");
var Get_map = require("./map");

let font = new g.DynamicFont({
    game: g.game,
    fontFamily: "sans-serif",
    size: 60,
  });

let time = 60;

function MainScene(){
    var scene = new g.Scene({
        game: g.game,
        assetPaths:["/audio/*", "/image/*"]
    });

    Global.scene = scene;

    let map = Get_map();
    let enemymanager;
    let player;
    let obstaclemanager = new ObstacleManager(map);
    let background = new Background();

    scene.onLoad.add(function(){
       let bgm = scene.asset.getAudioById("music").play();
       bgm.changeVolume(0.4);
       let root = background.root;
       let basics = getBasics(scene);

       player = new Player(map);
       enemymanager = new EnemyManager(map);

        scene.setTimeout(function() {
            if(Global.isAtsumaru){
                window.RPGAtsumaru.scoreboards.setRecord(1, Math.floor(g.game.vars.gameState.score));
            }
        }, 60000);

        scene.setTimeout(function() {
            if(Global.isAtsumaru){
                window.RPGAtsumaru.scoreboards.display(1);
            }
        }, 61000);

        if(Global.isAtsumaru){
            let ranking = new g.Sprite({ //ランキングボタン
                scene: Global.scene,	src: scene.asset.getImageById("ranking"), parent:root,
                 x: g.game.width*0.94, y: g.game.height*0.6, scaleX: 1.25, scaleY: 1.25,
                anchorX: 0.5, anchorY: 0.5, touchable: true,
             });
             ranking.onPointDown.add(function() {// ランキング表示
                window.RPGAtsumaru.scoreboards.display(1);
             });
            let restart = new g.Sprite({ // リスタートボタン
                 scene: Global.scene,	src: scene.asset.getImageById("restart"), parent:root,
                x: g.game.width*0.94, y: g.game.height*0.8, scaleX: 1.25, scaleY: 1.25,
                    anchorX: 0.5, anchorY: 0.5, touchable: true,
                 });
            restart.onPointDown.add(function() {// リスタート操作
                g.game.vars.gameState.score = 0;
                time = 60;
                g.game.replaceScene(MainScene());
            });
        }

        scene.append(root);
        scene.append(player.root);
        scene.append(basics);
        enemymanager.setup();
        obstaclemanager.setup();
    })

    scene.onUpdate.add(function(){
        Global.time +=  1/g.game.fps;
        player.update();
        enemymanager.update()
        obstaclemanager.update()
        background.update();
    });

    return scene;
}

function getBasics(scene){
    let root = new g.E({scene: scene});

    let score_label = new g.Label({
        scene: scene,
        font: font,
        text: g.game.vars.gameState.score + "M",
        fontSize: 40,
        textColor: "black",
        x: 30,//g.game.width-200,
        y: 20
    });
    root.append(score_label);

    let time_label = new g.Label({
        scene: scene,
        font: font,
        text: "残り"+time+"秒",
        fontSize: 40,
        textColor: "black",
        x: 30,
        y: 60
    });
    root.append(time_label);

    scene.onUpdate.add(function(){   
        score_label.text="最高 "+Math.floor(g.game.vars.gameState.score)+"M";
        score_label.invalidate();
        
        time -= 1/g.game.fps; 
        time_label.text="残り "+Math.ceil(time)+"秒";
        time_label.invalidate();
    })

    return root;

}

module.exports = MainScene;