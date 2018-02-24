/// <reference path="_references.ts"/>
// IIFE - Immediately Invoked Function Expression
(function () {
    // Game Variables
    var canvas = document.getElementById("canvas");
    var stage;
    var helloLabel;
    var clickMeButton;
    var assetManifest;
    var currentScene;
    var currentState;
    assetManifest = [
        { id: "clickMeButton", src: "./Assets/images/clickMeButton.png" },
        { id: "startButton", src: "./Assets/images/startButton.png" },
        { id: "nextButton", src: "./Assets/images/nextButton.png" },
        { id: "backButton", src: "./Assets/images/backButton.png" },
        { id: "p1heavy", src: "./Assets/images/p1heavy.png" },
        { id: "p1medium", src: "./Assets/images/p1medium.png" },
        { id: "p1light", src: "./Assets/images/p1light.png" },
        { id: "p2heavy", src: "./Assets/images/p2heavy.png" },
        { id: "p2medium", src: "./Assets/images/p2medium.png" },
        { id: "p2light", src: "./Assets/images/p2light.png" },
        { id: "bullet", src: "./Assets/images/bullet.png" },
        { id: "selection", src: "./Assets/images/selection.png" },
        { id: "bg1", src: "./Assets/images/bg1.png" }
    ];
    // preloads assets
    function Init() {
        console.log("Initialization Started...");
        Core.GameManager.assetManager = new createjs.LoadQueue(); // creates the assetManager object
        Core.GameManager.assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
        Core.GameManager.assetManager.loadManifest(assetManifest);
        Core.GameManager.assetManager.on("complete", Start, this);
    }
    function Start() {
        console.log("Starting Application...");
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20); // turn this on for buttons
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);
        Core.GameManager.stage = stage;
        Core.GameManager.currentScene = config.Scene.START;
        currentState = config.Scene.START;
        document.addEventListener('keydown', DetectKey);
        console.log("Listening to Keyboad...");
        Main();
    }
    function Update() {
        // if the scene that is playing returns another current scene
        // then call Main again and switch the scene
        if (currentState != Core.GameManager.currentScene) {
            Main();
        }
        currentScene.Update();
        stage.update(); // redraws the stage
    }
    function Main() {
        stage.removeAllChildren();
        switch (Core.GameManager.currentScene) {
            case config.Scene.START:
                currentScene = new scenes.StartScene();
                break;
            case config.Scene.PLAY:
                currentScene = new scenes.PlayScene();
                break;
            case config.Scene.OVER:
                currentScene = new scenes.OverScene();
                break;
        }
        currentState = Core.GameManager.currentScene;
        stage.addChild(currentScene);
    }
    function DetectKey(event) {
        Core.GameManager.KeyboardEvent = event;
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map