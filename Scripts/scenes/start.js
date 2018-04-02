var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var StartScene = /** @class */ (function (_super) {
        __extends(StartScene, _super);
        // Public Properties
        // Constructor
        function StartScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        StartScene.prototype._startButtonClick = function () {
            if ((Core.GameManager.Player1TankType != null) && (Core.GameManager.Player1TankType != null)) {
                Core.GameManager.currentScene = config.Scene.LEVEL1;
            }
            else {
                alert("Both Players need to select tank types!!!");
            }
        };
        StartScene.prototype._resetP1Visibility = function () {
            this._p1Heavy.visible = true;
            this._p1Medium.visible = true;
            this._p1Light.visible = true;
        };
        StartScene.prototype._highlightP1Selection = function () {
            switch (Core.GameManager.Player1TankType) {
                case config.tankTypes.HEAVY:
                    if (this._p1SelectionAnimation.currentAnimation != this._p1Heavy.name) {
                        this._p1SelectionAnimation.gotoAndPlay(this._p1Heavy.name);
                        this._p1SelectionAnimation.UpdateProperties();
                        this._p1SelectionAnimation.x = this._p1Heavy.x;
                        this._p1SelectionAnimation.y = this._p1Heavy.y;
                        this._resetP1Visibility();
                        this._p1Heavy.visible = false;
                    }
                    break;
                case config.tankTypes.MEDIUM:
                    if (this._p1SelectionAnimation.currentAnimation != this._p1Medium.name) {
                        this._p1SelectionAnimation.gotoAndPlay(this._p1Medium.name);
                        this._p1SelectionAnimation.UpdateProperties();
                        this._p1SelectionAnimation.x = this._p1Medium.x;
                        this._p1SelectionAnimation.y = this._p1Medium.y;
                        this._resetP1Visibility();
                        this._p1Medium.visible = false;
                    }
                    break;
                case config.tankTypes.LIGHT:
                    if (this._p1SelectionAnimation.currentAnimation != this._p1Light.name) {
                        this._p1SelectionAnimation.gotoAndPlay(this._p1Light.name);
                        this._p1SelectionAnimation.UpdateProperties();
                        this._p1SelectionAnimation.x = this._p1Light.x;
                        this._p1SelectionAnimation.y = this._p1Light.y;
                        this._resetP1Visibility();
                        this._p1Light.visible = false;
                    }
                    break;
            }
        };
        StartScene.prototype._resetP2Visibility = function () {
            this._p2Heavy.visible = true;
            this._p2Medium.visible = true;
            this._p2Light.visible = true;
        };
        StartScene.prototype._highlightP2Selection = function () {
            switch (Core.GameManager.Player2TankType) {
                case config.tankTypes.HEAVY:
                    if (this._p2SelectionAnimation.currentAnimation != this._p2Heavy.name) {
                        this._p2SelectionAnimation.gotoAndPlay(this._p2Heavy.name);
                        this._p2SelectionAnimation.UpdateProperties();
                        this._p2SelectionAnimation.x = this._p2Heavy.x;
                        this._p2SelectionAnimation.y = this._p2Heavy.y;
                        this._resetP2Visibility();
                        this._p2Heavy.visible = false;
                    }
                    break;
                case config.tankTypes.MEDIUM:
                    if (this._p2SelectionAnimation.currentAnimation != this._p2Medium.name) {
                        this._p2SelectionAnimation.gotoAndPlay(this._p2Medium.name);
                        this._p2SelectionAnimation.UpdateProperties();
                        this._p2SelectionAnimation.x = this._p2Medium.x;
                        this._p2SelectionAnimation.y = this._p2Medium.y;
                        this._resetP2Visibility();
                        this._p2Medium.visible = false;
                    }
                    break;
                case config.tankTypes.LIGHT:
                    if (this._p2SelectionAnimation.currentAnimation != this._p2Light.name) {
                        this._p2SelectionAnimation.gotoAndPlay(this._p2Light.name);
                        this._p2SelectionAnimation.UpdateProperties();
                        this._p2SelectionAnimation.x = this._p2Light.x;
                        this._p2SelectionAnimation.y = this._p2Light.y;
                        this._resetP2Visibility();
                        this._p2Light.visible = false;
                    }
                    break;
            }
        };
        StartScene.prototype._setPlayerSelection = function (eventObject) {
            switch (eventObject.target.name) {
                case "p1heavy":
                    Core.GameManager.Player1TankType = config.tankTypes.HEAVY;
                    break;
                case "p1medium":
                    Core.GameManager.Player1TankType = config.tankTypes.MEDIUM;
                    break;
                case "p1light":
                    Core.GameManager.Player1TankType = config.tankTypes.LIGHT;
                    break;
                case "p2heavy":
                    Core.GameManager.Player2TankType = config.tankTypes.HEAVY;
                    break;
                case "p2medium":
                    Core.GameManager.Player2TankType = config.tankTypes.MEDIUM;
                    break;
                case "p2light":
                    Core.GameManager.Player2TankType = config.tankTypes.LIGHT;
                    break;
            }
        };
        // Public Methods
        // Initialize Game Variables and objects
        StartScene.prototype.Start = function () {
            this._p1SelectionAnimation = new base.GameObject("bullet");
            this._p2SelectionAnimation = new base.GameObject("bullet");
            this._p1SelectionAnimation.x = 10000;
            this._p2SelectionAnimation.x = 10000;
            Core.GameManager.Player1TankType = null;
            Core.GameManager.Player2TankType = null;
            // this._selectionShadow = new base.Button("selection", 100, 100);
            this._background = new Levels.Background("start");
            this._player1 = new base.Label("Player1:", "24px", "Impact", "#000000", 100, 50, true);
            this._p1Heavy = new base.Button("p1heavy", 200, 100);
            this._p1Medium = new base.Button("p1medium", 300, 100);
            this._p1Light = new base.Button("p1light", 400, 100);
            this._player2 = new base.Label("Player2:", "24px", "Impact", "#000000", 100, 200, true);
            this._p2Heavy = new base.Button("p2heavy", 200, 250);
            this._p2Medium = new base.Button("p2medium", 300, 250);
            this._p2Light = new base.Button("p2light", 400, 250);
            this._startButton = new base.Button("startButton", 300, 400);
            this.Main();
        };
        StartScene.prototype.Update = function () {
            this._highlightP1Selection();
            this._highlightP2Selection();
        };
        // This is where the fun happens
        StartScene.prototype.Main = function () {
            this.addChild(this._background);
            // this.addChild(this._selectionShadow);
            this.addChild(this._player1);
            this.addChild(this._player2);
            //this.addChild(this._selectionShadow);
            this.addChild(this._p1Heavy);
            this.addChild(this._p1Medium);
            this.addChild(this._p1Light);
            this.addChild(this._p2Heavy);
            this.addChild(this._p2Medium);
            this.addChild(this._p2Light);
            this.addChild(this._p1SelectionAnimation);
            this.addChild(this._p2SelectionAnimation);
            // add the startButton to the scene
            this.addChild(this._startButton);
            this._p1Heavy.on("click", this._setPlayerSelection);
            this._p1Medium.on("click", this._setPlayerSelection);
            this._p1Light.on("click", this._setPlayerSelection);
            this._p2Heavy.on("click", this._setPlayerSelection);
            this._p2Medium.on("click", this._setPlayerSelection);
            this._p2Light.on("click", this._setPlayerSelection);
            this._startButton.on("click", this._startButtonClick);
        };
        return StartScene;
    }(base.Scene));
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map