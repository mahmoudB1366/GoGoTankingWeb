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
    var PlayScene = /** @class */ (function (_super) {
        __extends(PlayScene, _super);
        //private _island: objects.Island;
        //private _clouds: objects.Cloud[];
        // private _cloudNum: number;
        // Public Properties
        // Constructor
        function PlayScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        PlayScene.prototype.updateLables = function () {
            this._frameCounter += 1;
            if (this._frameCounter >= 60) {
                if (Core.GameManager.Timer > 0) {
                    Core.GameManager.Timer -= 1;
                }
                this._frameCounter = 0;
            }
            this._p1Label.text = "Player1: " + Core.GameManager.P1Health;
            this._p2Label.text = "Player2: " + Core.GameManager.P2Health;
            this._timerLabel.text = "|" + Core.GameManager.Timer + "|";
        };
        PlayScene.prototype.checkLives = function () {
            if (this._player1 != null) {
                this._player1.Update();
                if (Core.GameManager.P1Health <= 0) {
                    this.removeChild(this._player1);
                    this._player1 = null;
                    Core.GameManager.Level1Winner = "Player2";
                    Core.GameManager.currentScene = config.Scene.OVER;
                }
            }
            if (this._player2 != null) {
                this._player2.Update();
                if (Core.GameManager.P2Health <= 0) {
                    this.removeChild(this._player2);
                    this._player2 = null;
                    Core.GameManager.Level1Winner = "Player1";
                    Core.GameManager.currentScene = config.Scene.OVER;
                }
            }
        };
        PlayScene.prototype.setupTankTypes = function () {
            switch (Core.GameManager.Player1TankType) {
                case config.tankTypes.HEAVY:
                    this._player1 = new objects.P1Heavy();
                    break;
                case config.tankTypes.MEDIUM:
                    this._player1 = new objects.P1Medium();
                    break;
                case config.tankTypes.LIGHT:
                    this._player1 = new objects.P1Medium();
                    break;
            }
            switch (Core.GameManager.Player2TankType) {
                case config.tankTypes.HEAVY:
                    this._player2 = new objects.P2Heavy();
                    break;
                case config.tankTypes.MEDIUM:
                    this._player2 = new objects.P2Medium();
                    break;
                case config.tankTypes.LIGHT:
                    this._player2 = new objects.P2Medium();
                    break;
            }
        };
        // Public Methods
        // Initialize Game Variables and objects
        PlayScene.prototype.Start = function () {
            Core.GameManager.Timer = 90;
            this._frameCounter = 0;
            this._background = new Levels.Level1();
            this._p1Label = new base.Label("Player1: " + Core.GameManager.P1Health, "16px", "Consolas", "#000000", 100, 15, true);
            this._p2Label = new base.Label("Player2: " + Core.GameManager.P2Health, "16px", "Consolas", "#000000", 600, 15, true);
            this._timerLabel = new base.Label("|" + Core.GameManager.Timer + "|", "16px", "Consolas", "#000000", 320, 15, true);
            this.setupTankTypes();
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            this.updateLables();
            this._background.Update();
            this.checkLives();
        };
        // This is where the fun happens
        PlayScene.prototype.Main = function () {
            // add the background to the scene
            this.addChild(this._background);
            // add the Players to the scene
            this.addChild(this._player1);
            this.addChild(this._player2);
            this.addChild(this._p1Label);
            this.addChild(this._p2Label);
            this.addChild(this._timerLabel);
            Core.GameManager.playScene = this;
        };
        return PlayScene;
    }(base.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map