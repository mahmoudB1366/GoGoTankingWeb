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
    var Level2Scene = /** @class */ (function (_super) {
        __extends(Level2Scene, _super);
        // Public Properties
        // Constructor
        function Level2Scene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        Level2Scene.prototype.CheckCollisions = function () {
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
        Level2Scene.prototype.displayPopup = function () {
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
        Level2Scene.prototype.generateRandomNumber = function (corodinates) {
            switch (corodinates) {
                case "x":
                    return Math.floor(Math.random() * 610) + 15;
                case "y":
                    return Math.floor(Math.random() * 450) + 15;
            }
        };
        Level2Scene.prototype.updateLables = function () {
            this._frameCounter += 1;
            if (this._frameCounter >= 60) {
                if (Core.GameManager.Timer > 0) {
                    this.displayPopup();
                    Core.GameManager.Timer -= 1;
                }
                this._frameCounter = 0;
            }
            this._p1Label.SetText("P1: " + Core.GameManager.P1Health);
            this._p2Label.SetText("P2: " + Core.GameManager.P2Health);
            if (Core.GameManager.Timer < 30) {
                this._timerLabel.text = ".:Last Shot:.";
            }
            else {
                this._timerLabel.text = "|" + Core.GameManager.Timer + "|";
            }
        };
        Level2Scene.prototype.checkLives = function () {
            if (this._player1 != null) {
                this._player1.Update();
                if (Core.GameManager.P1Health <= 0 && !this._player1.onExplosion) {
                    this._player1.gotoAndPlay("explosion");
                    this._player1.onExplosion = true;
                    // this._player1.Life = 999;
                }
                if (this._player1.onExplosion && this._player1.paused) {
                    this.removeChild(this._player1);
                    Core.GameManager.Level2Winner = "Player2";
                    this._tankSound.stop();
                    Core.GameManager.transferTarget = config.Scene.LEVEL3;
                    Core.GameManager.currentScene = config.Scene.TRANSFER;
                    this._player1 = null;
                }
            }
            if (this._player2 != null) {
                this._player2.Update();
                if (Core.GameManager.P2Health <= 0 && !this._player2.onExplosion) {
                    this._player2.gotoAndPlay("explosion");
                    this._player2.onExplosion = true;
                }
                if (this._player2.onExplosion && this._player2.paused) {
                    this.removeChild(this._player2);
                    Core.GameManager.Level2Winner = "Player1";
                    this._tankSound.stop();
                    Core.GameManager.transferTarget = config.Scene.LEVEL3;
                    Core.GameManager.currentScene = config.Scene.TRANSFER;
                    this._player2 = null;
                }
            }
            if (this._obstacles != null)
                if (this._obstacles.length > 0) {
                    for (var i = 0; i < this._obstacles.length; ++i) {
                        if (this._obstacles[i].Life < 1 && !this._obstacles[i].onExplosion) {
                            this._obstacles[i].gotoAndPlay("explosion");
                            this._obstacles[i].onExplosion = true;
                        }
                        if (this._obstacles[i].onExplosion && this._obstacles[i].paused) {
                            this.removeChild(this._obstacles[i]);
                            this._obstacles[i].x = 12000;
                        }
                    }
                }
        };
        Level2Scene.prototype.setupTankTypes = function () {
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
            this._player1.y = 340;
            this._player2.x = 600;
            this._player2.y = 340;
        };
        Level2Scene.prototype.defineObstacles = function () {
            var _obstacleCounter = 0;
            this._obstacles = new Array();
            // Rock - four corners
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(90, 390, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(550, 90, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(90, 90, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(550, 390, "stone");
            // Rock - non-starting quadrants
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(95, 90, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(545, 390, "stone");
            // Rock - horizontal middle of top
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(300, 25, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(350, 25, "stone");
            // Rock - horizontal middle of bottom
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(340, 455, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(290, 455, "stone");
            // Wood - constricting horizontal movement
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210, 150, "wood");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430, 330, "wood");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(315, 395, "wood");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(325, 85, "wood");
            // Water - fragmented river through center
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25, 265, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615, 215, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(75, 265, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(565, 215, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(190, 265, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(450, 215, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(240, 265, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(400, 215, "sea");
            // Grass - across the water, middle of left and right
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25, 215, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615, 265, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(65, 215, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(575, 265, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25, 175, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615, 305, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(65, 175, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(575, 305, "grass");
            // fill gaps
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(45, 195, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(595, 285, "grass");
            // Grass - adjacent to top & bottom obstacles
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(250, 25, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(390, 455, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210, 25, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430, 455, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(250, 65, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(390, 415, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210, 65, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430, 415, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(275, 75, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(365, 405, "grass");
            // fill gaps
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(230, 45, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(410, 435, "grass");
        };
        Level2Scene.prototype.loadbstacles = function () {
            var i = 0;
            while (this._obstacles[i] != null) {
                this.addChild(this._obstacles[i++]);
            }
        };
        // Public Methods
        // Initialize Game Variables and objects
        Level2Scene.prototype.Start = function () {
            Core.GameManager.Timer = 90;
            this._frameCounter = 0;
            this._background = new Levels.Background("bg2");
            this._p1Label = new base.Label("P1: " + Core.GameManager.P1Health, "20px", "Impact", "#843415", 20, 15, false);
            this._p2Label = new base.Label("P2: " + Core.GameManager.P2Health, "20px", "Impact", "#0C491D", 565, 15, false);
            this._timerLabel = new base.Label("|" + Core.GameManager.Timer + "|", "22px", "Impact", "#454950", 320, 15, true);
            this._labelBg = new createjs.Bitmap(Core.GameManager.assetManager.getResult("labelBg"));
            this._labelBg.alpha = 0.5;
            this.setupTankTypes();
            this._tankSound = createjs.Sound.play("level2sd");
            this._tankSound.loop = -1;
            this._tankSound.volume = 0.2;
            this._mine = new Levels.PopUp(5000, 5000, "mine");
            this._star = new Levels.PopUp(5000, 5000, "star");
            this._range = new Levels.PopUp(5000, 5000, "range");
            this._health = new Levels.PopUp(5000, 5000, "health");
            this.defineObstacles();
            this.Main();
        };
        Level2Scene.prototype.Update = function () {
            this.CheckCollisions();
            this.updateLables();
            this._background.Update();
            this.checkLives();
            this._player1 = Core.GameManager.P1Tank;
            this._player2 = Core.GameManager.P2Tank;
        };
        // This is where the fun happens
        Level2Scene.prototype.Main = function () {
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
            this.addChild(this._labelBg);
            this.addChild(this._p1Label);
            this.addChild(this._p2Label);
            this.addChild(this._timerLabel);
            Core.GameManager.playScene = this;
        };
        return Level2Scene;
    }(base.Scene));
    scenes.Level2Scene = Level2Scene;
})(scenes || (scenes = {}));
//# sourceMappingURL=level2.js.map