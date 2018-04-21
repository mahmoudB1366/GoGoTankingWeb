/// <reference path="_references.ts"/>

// IIFE - Immediately Invoked Function Expression
(function(){

  // Game Variables
  let canvas = document.getElementById("canvas");
  let stage:createjs.Stage;
  let helloLabel: base.Label;
  let clickMeButton: base.Button;
  let assetManifest: any[];
  let currentScene: base.Scene;
  let currentState: number;
  let keyBoardManager: managers.KeyboardManager;
  let textureAtlasData: any;
  let textureAtlas: createjs.SpriteSheet;

  textureAtlasData = {

    "images": [
        ""
    ],

    "frames": [
      [91, 4, 9, 9, 0, 0, 0],
      [104, 4, 49, 50, 0, 0, 0],
      [4, 33, 50, 48, 0, 0, 0],
      [157, 4, 49, 50, 0, 0, 0],
      [210, 4, 49, 50, 0, 0, 0],
      [263, 4, 49, 50, 0, 0, 0],
      [316, 4, 49, 50, 0, 0, 0],
      [369, 4, 49, 50, 0, 0, 0],
      [422, 4, 49, 50, 0, 0, 0],
      [475, 4, 25, 25, 0, 0, 0],
      [475, 33, 25, 25, 0, 0, 0],
      [58, 58, 50, 50, 0, 0, 0],
      [4, 4, 25, 25, 0, 0, 0],
      [4, 85, 25, 25, 0, 0, 0],
      [112, 58, 48, 47, 0, 0, 0],
      [164, 58, 48, 47, 0, 0, 0],
      [216, 58, 48, 47, 0, 0, 0],
      [268, 58, 48, 47, 0, 0, 0],
      [320, 58, 40, 42, 0, 0, 0],
      [364, 58, 40, 43, 0, 0, 0],
      [320, 104, 40, 44, 0, 0, 0],
      [408, 58, 40, 43, 0, 0, 0],
      [452, 62, 36, 48, 0, 0, 0],
      [364, 105, 36, 49, 0, 0, 0],
      [404, 105, 36, 50, 0, 0, 0],
      [444, 114, 36, 49, 0, 0, 0],
      [112, 109, 48, 47, 0, 0, 0],
      [33, 112, 48, 47, 0, 0, 0],
      [164, 109, 48, 47, 0, 0, 0],
      [216, 109, 48, 47, 0, 0, 0],
      [268, 109, 40, 41, 0, 0, 0],
      [312, 152, 40, 42, 0, 0, 0],
      [268, 154, 40, 43, 0, 0, 0],
      [356, 158, 40, 42, 0, 0, 0],
      [312, 198, 36, 48, 0, 0, 0],
      [400, 159, 36, 48, 0, 0, 0],
      [352, 204, 36, 49, 0, 0, 0],
      [440, 167, 36, 48, 0, 0, 0],
      [33, 4, 25, 25, 0, 0, 0],
      [480, 167, 25, 24, 0, 0, 0],
      [392, 219, 50, 50, 0, 0, 0],
      [62, 4, 25, 25, 0, 0, 0],
      [480, 195, 25, 25, 0, 0, 0],
      [446, 224, 50, 50, 0, 0, 0],
      [85, 160, 50, 48, 0, 0, 0],
      [4, 163, 50, 50, 0, 0, 0],
      [139, 160, 50, 50, 0, 0, 0],
      [58, 212, 50, 50, 0, 0, 0],
      ],
      "animations": {
         "bullet": {
            "frames": [0] 
         },
         "explosion": {
            "frames":  [7,6,5,4,3,2,1] 
            ,"speed": 0.3
            ,next:""
         },
         "grass": {
            "frames": [8] 
         },
         "health": {
            "frames": [9,10] 
            ,"speed": 0.025
         },
         "house": {
            "frames": [11] 
         },
         "mine": {
            "frames": [12,13] 
            ,"speed": 0.025
         },
         "p1heavy": {
            "frames": [14,15,16,17] 
            ,"speed": 0.15
         },
         "p1light": {
            "frames": [18,19,20,21] 
            ,"speed": 0.15
         },
         "p1medium": {
            "frames": [22,23,24,25] 
            ,"speed": 0.15
         },
         "p2heavy": {
            "frames": [26,27,28,29] 
            ,"speed": 0.15
         },
         "p2light": {
            "frames": [30,31,32,33] 
            ,"speed": 0.15
         },
         "p2medium": {
            "frames": [34,35,36,37] 
            ,"speed": 0.15
         },
         "range": {
            "frames": [38,39] 
            ,"speed": 0.025
        },
         "sea": {
            "frames": [40] 
         },
         "star": {
            "frames": [41,42] 
            ,"speed": 0.025
         },
         "stone": {
            "frames": [43] 
         },
         "tree": {
            "frames": [44] 
         },
         "wood": {
            "frames": [45] 
         },
         "wood2": {
            "frames": [46] 
         },
         "wood3": {
            "frames": [47] 
         }
      }

    };

  assetManifest = [
    {id: "atlas", src:"./Assets/sprites/atlas.png"},
    //Buttons
    {id: "startButton", src:"./Assets/images/startButton.png"},
    {id: "backButton", src:"./Assets/images/backButton.png"},
    {id: "p1heavy", src:"./Assets/images/p1heavy.png"},
    {id: "p1medium", src:"./Assets/images/p1medium.png"},
    {id: "p1light", src:"./Assets/images/p1light.png"},
    {id: "p2heavy", src:"./Assets/images/p2heavy.png"},
    {id: "p2medium", src:"./Assets/images/p2medium.png"},
    {id: "p2light", src:"./Assets/images/p2light.png"},
   
    //Backgrounds
    {id: "bg1", src:"./Assets/images/bg1.png"},
    {id: "bg2", src:"./Assets/images/bg2.png"},
    {id: "bg3", src:"./Assets/images/bg3.png"},
    {id: "start", src:"./Assets/images/start.png"},
    {id: "gameOver", src:"./Assets/images/gameover.png"},
    {id: "labelBg", src:"./Assets/images/labelBg.png"},
    {id: "loading", src:"./Assets/images/loadingBg.png"},

    //Sounds
    {id: "level1sd", src:"./Assets/audio/level1sd.mp3"},
    {id: "level2sd", src:"./Assets/audio/level2sd.mp3"},
    {id: "level3sd", src:"./Assets/audio/level3sd.mp3"},
    {id: "fire", src:"./Assets/audio/fire.mp3"},
    {id: "explosion", src:"./Assets/audio/explosion.mp3"},
    {id: "powerup", src:"./Assets/audio/powerup.wav"},
    {id: "starsd", src:"./Assets/audio/starsd.wav"},
    {id: "rangesd", src:"./Assets/audio/rangesd.wav"},
    {id: "explosion2", src:"./Assets/audio/explosion2.wav"},
    {id: "explosion3", src:"./Assets/audio/explosion3.wav"}
  ];

  // preloads assets
  function Init():void {
    console.log("Initialization Started...");
    Core.GameManager.assetManager = new createjs.LoadQueue(); // creates the assetManager object
    Core.GameManager.assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
    Core.GameManager.assetManager.loadManifest(assetManifest);
    Core.GameManager.assetManager.on("complete", Start, this);
  }

  function Start():void {
    console.log("Starting Application...");
    textureAtlasData.images = [ Core.GameManager.assetManager.getResult("atlas") ];
    textureAtlas = new createjs.SpriteSheet(textureAtlasData);
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // turn this on for buttons
    createjs.Ticker.framerate = 60; // 60 FPS
    createjs.Ticker.on("tick", Update);

    Core.GameManager.stage = stage;
    Core.GameManager.currentScene = config.Scene.START;
    currentState = config.Scene.START;

    keyBoardManager = new managers.KeyboardManager();
    Core.GameManager.keyboardManager = keyBoardManager;
    Core.GameManager.textureAtlas = textureAtlas;
    console.log("Listening to Keyboad...");
    Main();
  }

  function Update():void {
    // if the scene that is playing returns another current scene
    // then call Main again and switch the scene
    if(currentState!= Core.GameManager.currentScene) {
      Main();
    }

    currentScene.Update();

    stage.update(); // redraws the stage
  }

  function Main():void {
    stage.removeAllChildren();

    switch(Core.GameManager.currentScene) {
      case config.Scene.START:
        currentScene = new scenes.StartScene();
      break;
      case config.Scene.TRANSFER:
      currentScene = new scenes.TransferScene();
    break;
      case config.Scene.LOAD:
      currentScene = new scenes.LoadScene();
    break;
      case config.Scene.LEVEL1:
        currentScene = new scenes.Level1Scene();
      break;
      case config.Scene.LEVEL2:
      currentScene = new scenes.Level2Scene();
    break;
    case config.Scene.LEVEL3:
    currentScene = new scenes.Level3Scene();
  break;
      case config.Scene.OVER:
        currentScene = new scenes.OverScene();
      break;
    }

    currentState = Core.GameManager.currentScene;
    stage.addChild(currentScene);
  }

  window.onload = Init;

})();
