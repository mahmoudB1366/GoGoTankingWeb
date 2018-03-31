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

  assetManifest = [
    {id: "startButton", src:"./Assets/images/startButton.png"},
    {id: "backButton", src:"./Assets/images/backButton.png"},
    {id: "p1heavy", src:"./Assets/images/p1heavy.png"},
    {id: "p1medium", src:"./Assets/images/p1medium.png"},
    {id: "p1light", src:"./Assets/images/p1light.png"},
    {id: "p2heavy", src:"./Assets/images/p2heavy.png"},
    {id: "p2medium", src:"./Assets/images/p2medium.png"},
    {id: "p2light", src:"./Assets/images/p2light.png"},
    {id: "bullet", src:"./Assets/images/bullet.png"},
    {id: "selection", src:"./Assets/images/selection.png"},
    {id: "bg1", src:"./Assets/images/bg1.png"},
    {id: "bg2", src:"./Assets/images/bg2.png"},
    {id: "bg3", src:"./Assets/images/bg3.png"},
    {id: "start", src:"./Assets/images/start.png"},
    {id: "gameOver", src:"./Assets/images/gameover.png"},
    {id: "level1sd", src:"./Assets/audio/level1sd.mp3"},
    {id: "level2sd", src:"./Assets/audio/level2sd.mp3"},
    {id: "level3sd", src:"./Assets/audio/level3sd.mp3"},
    {id: "fire", src:"./Assets/audio/fire.mp3"},
    {id: "explosion", src:"./Assets/audio/explosion.mp3"},
    {id: "powerup", src:"./Assets/audio/powerup.wav"},
    {id: "starsd", src:"./Assets/audio/starsd.wav"},
    {id: "rangesd", src:"./Assets/audio/rangesd.wav"},
    {id: "explosion2", src:"./Assets/audio/explosion2.wav"},
    {id: "explosion3", src:"./Assets/audio/explosion3.wav"},
    {id: "stone", src:"./Assets/images/stone.png"},
    {id: "tree", src:"./Assets/images/tree.png"},
    {id: "wood", src:"./Assets/images/wood.png"},
    {id: "sea", src:"./Assets/images/sea.png"},
    {id: "star", src:"./Assets/images/star.png"},
    {id: "mine", src:"./Assets/images/mine.png"},
    {id: "health", src:"./Assets/images/health.png"},
    {id: "range", src:"./Assets/images/range.png"},
    {id: "grass", src:"./Assets/images/grass.png"},
    {id: "house", src:"./Assets/images/house.png"}
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
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // turn this on for buttons
    createjs.Ticker.framerate = 60; // 60 FPS
    createjs.Ticker.on("tick", Update);

    Core.GameManager.stage = stage;
    Core.GameManager.currentScene = config.Scene.START;
    currentState = config.Scene.START;

    keyBoardManager = new managers.KeyboardManager();
    Core.GameManager.keyboardManager = keyBoardManager;
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
