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
    var Level1Scene = /** @class */ (function (_super) {
        __extends(Level1Scene, _super);
        // Public Properties
        // Constructor
        function Level1Scene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        Level1Scene.prototype.CheckCollisions = function () {
            var i = 0;
            var _collidablesCounter = 0;
            var _collidables = new Array();
            var _bullet1 = this.getChildByName("Bullet1");
            var _bullet2 = this.getChildByName("Bullet2");
            var _player1 = this.getChildByName("Player1");
            var _player2 = this.getChildByName("Player2");
            _collidables[_collidablesCounter++] = _player2;
            _collidables[_collidablesCounter++] = _player1;
            _collidables[_collidablesCounter++] = this._star;
            _collidables[_collidablesCounter++] = this._health;
            _collidables[_collidablesCounter++] = this._mine;
            _collidables[_collidablesCounter++] = this._range;
            while (this._obstacles[i] != null) {
                _collidables[_collidablesCounter++] = this._obstacles[i++];
            }
            if (_bullet1 != null) {
                managers.Collision.CheckBullet(_bullet1, _collidables, "Player2");
            }
            if (_bullet2 != null) {
                managers.Collision.CheckBullet(_bullet2, _collidables, "Player1");
            }
            if (_player1 != null) {
                managers.Collision.CheckTank(_player1, _collidables, "Player2");
            }
            if (_player2 != null) {
                managers.Collision.CheckTank(_player2, _collidables, "Player1");
            }
            _collidables = null;
        };
        Level1Scene.prototype.displayPopup = function () {
            var _timer = Core.GameManager.Timer;
            if (_timer > 0) {
                if (_timer % 20 == 0) {
                    this._health.x = this.generateRandomNumber("x");
                    this._health.y = this.generateRandomNumber("y");
                    this._star.x = this.generateRandomNumber("x");
                    this._star.y = this.generateRandomNumber("y");
                    this._range.x = this.generateRandomNumber("x");
                    this._range.y = this.generateRandomNumber("y");
                }
                if (_timer % 30 == 0) {
                    this._mine.x = this.generateRandomNumber("x");
                    this._mine.y = this.generateRandomNumber("y");
                }
            }
        };
        Level1Scene.prototype.generateRandomNumber = function (corodinates) {
            switch (corodinates) {
                case "x":
                    return Math.floor(Math.random() * 610) + 15;
                case "y":
                    return Math.floor(Math.random() * 450) + 15;
            }
        };
        Level1Scene.prototype.updateLables = function () {
            this._frameCounter += 1;
            if (this._frameCounter >= 60) {
                if (Core.GameManager.Timer > 0) {
                    this.displayPopup();
                    Core.GameManager.Timer -= 1;
                }
                this._frameCounter = 0;
            }
            this._p1Label.text = "Player1: " + Core.GameManager.P1Health;
            this._p2Label.text = "Player2: " + Core.GameManager.P2Health;
            if (Core.GameManager.Timer < 30) {
                this._timerLabel.text = ".:Last Shot:.";
            }
            else {
                this._timerLabel.text = "|" + Core.GameManager.Timer + "|";
            }
        };
        Level1Scene.prototype.checkLives = function () {
            if (this._player1 != null) {
                this._player1.Update();
                if (Core.GameManager.P1Health <= 0) {
                    this.removeChild(this._player1);
                    this._player1 = null;
                    Core.GameManager.Level1Winner = "Player2";
                    this._tankSound.stop();
                    Core.GameManager.currentScene = config.Scene.LEVEL2;
                }
            }
            if (this._player2 != null) {
                this._player2.Update();
                if (Core.GameManager.P2Health <= 0) {
                    this.removeChild(this._player2);
                    this._player2 = null;
                    Core.GameManager.Level1Winner = "Player1";
                    this._tankSound.stop();
                    Core.GameManager.currentScene = config.Scene.LEVEL2;
                }
            }
            if (this._obstacles != null)
                if (this._obstacles.length > 0) {
                    for (var i = 0; i < this._obstacles.length; ++i) {
                        if (this._obstacles[i].Life < 1) {
                            this.removeChild(this._obstacles[i]);
                            this._obstacles[i].x = 12000;
                        }
                    }
                }
        };
        Level1Scene.prototype.setupTankTypes = function () {
            switch (Core.GameManager.Player1TankType) {
                case config.tankTypes.HEAVY:
                    this._player1 = new objects.P1Heavy();
                    break;
                case config.tankTypes.MEDIUM:
                    this._player1 = new objects.P1Medium();
                    break;
                case config.tankTypes.LIGHT:
                    this._player1 = new objects.P1Light();
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
                    this._player2 = new objects.P2Light();
                    break;
            }
            this._player1.name = "Player1";
            this._player2.name = "Player2";
            Core.GameManager.P1Tank = this._player1;
            Core.GameManager.P2Tank = this._player2;
            this._player1.x = 40;
            this._player1.y = 240;
            this._player2.x = 600;
            this._player2.y = 240;
        };
        Level1Scene.prototype.defineObstacles = function () {
            var _obstacleCounter = 0;
            this._obstacles = new Array();
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(130, 190, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(130, 240, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(130, 290, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(510, 190, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(510, 240, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(510, 290, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(160, 80, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210, 80, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(260, 80, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(160, 400, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210, 400, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(260, 400, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(480, 80, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430, 80, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(380, 80, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(480, 400, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430, 400, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(380, 400, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(160, 130, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210, 130, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210, 155, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(180, 155, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(145, 160, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(160, 350, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210, 350, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210, 325, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(180, 325, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(145, 320, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(480, 130, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430, 130, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430, 325, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(460, 325, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(495, 320, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430, 155, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(460, 155, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(495, 160, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(260, 130, "wood");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(260, 350, "wood");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(380, 130, "wood");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(380, 350, "wood");
        };
        Level1Scene.prototype.loadbstacles = function () {
            var i = 0;
            while (this._obstacles[i] != null) {
                this.addChild(this._obstacles[i++]);
            }
        };
        // Public Methods
        // Initialize Game Variables and objects
        Level1Scene.prototype.Start = function () {
            Core.GameManager.Timer = 90;
            this._frameCounter = 0;
            this._background = new Levels.Background("bg1");
            this._p1Label = new base.Label("Player1: " + Core.GameManager.P1Health, "16px", "Consolas", "#000000", 100, 15, true);
            this._p2Label = new base.Label("Player2: " + Core.GameManager.P2Health, "16px", "Consolas", "#000000", 600, 15, true);
            this._timerLabel = new base.Label("|" + Core.GameManager.Timer + "|", "16px", "Consolas", "#000000", 320, 15, true);
            this.setupTankTypes();
            this._tankSound = createjs.Sound.play("tankMove");
            this._tankSound.loop = -1;
            this._tankSound.volume = 0.3;
            this._mine = new Levels.PopUp(5000, 5000, "mine");
            this._star = new Levels.PopUp(5000, 5000, "star");
            this._range = new Levels.PopUp(5000, 5000, "range");
            this._health = new Levels.PopUp(5000, 5000, "health");
            this.defineObstacles();
            this.Main();
        };
        Level1Scene.prototype.Update = function () {
            this.CheckCollisions();
            this.updateLables();
            this._background.Update();
            this.checkLives();
            this._player1 = Core.GameManager.P1Tank;
            this._player2 = Core.GameManager.P2Tank;
        };
        // This is where the fun happens
        Level1Scene.prototype.Main = function () {
            // add the background to the scene
            this.addChild(this._background);
            // add the Players to the scene
            this.addChild(this._player1);
            this.addChild(this._player2);
            this.loadbstacles();
            this.addChild(this._star);
            this.addChild(this._mine);
            this.addChild(this._health);
            this.addChild(this._range);
            this.addChild(this._player1.Bullet);
            this.addChild(this._player2.Bullet);
            this.addChild(this._p1Label);
            this.addChild(this._p2Label);
            this.addChild(this._timerLabel);
            Core.GameManager.playScene = this;
        };
        return Level1Scene;
    }(base.Scene));
    scenes.Level1Scene = Level1Scene;
})(scenes || (scenes = {}));
//# sourceMappingURL=level1.js.map