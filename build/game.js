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
            this._tankSound = createjs.Sound.play("level1sd");
            this._tankSound.loop = -1;
            this._tankSound.volume = 0.7;
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
            this._p1Label.text = "Player1: " + Core.GameManager.P1Health;
            this._p2Label.text = "Player2: " + Core.GameManager.P2Health;
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
                if (Core.GameManager.P1Health <= 0) {
                    this.removeChild(this._player1);
                    this._player1 = null;
                    Core.GameManager.Level1Winner = "Player2";
                    this._tankSound.stop();
                    Core.GameManager.currentScene = config.Scene.LEVEL3;
                }
            }
            if (this._player2 != null) {
                this._player2.Update();
                if (Core.GameManager.P2Health <= 0) {
                    this.removeChild(this._player2);
                    this._player2 = null;
                    Core.GameManager.Level1Winner = "Player1";
                    this._tankSound.stop();
                    Core.GameManager.currentScene = config.Scene.LEVEL3;
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
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(90, 390, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(550, 90, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(90, 90, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(550, 390, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(155, 210, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(485, 430, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(300, 25, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(340, 455, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(350, 25, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(290, 455, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210, 330, "wood");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(270, 310, "wood");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(315, 395, "wood");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(325, 85, "wood");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25, 265, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615, 215, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(75, 265, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(565, 265, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(190, 265, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(450, 215, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(240, 265, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(400, 215, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25, 215, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615, 265, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(65, 215, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(575, 265, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25, 175, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615, 305, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(65, 175, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(575, 305, "grass");
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
            this._p1Label = new base.Label("Player1: " + Core.GameManager.P1Health, "16px", "Consolas", "#000000", 100, 15, true);
            this._p2Label = new base.Label("Player2: " + Core.GameManager.P2Health, "16px", "Consolas", "#000000", 600, 15, true);
            this._timerLabel = new base.Label("|" + Core.GameManager.Timer + "|", "16px", "Consolas", "#000000", 320, 15, true);
            this.setupTankTypes();
            this._tankSound = createjs.Sound.play("level2sd");
            this._tankSound.loop = -1;
            this._tankSound.volume = 0.7;
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
            this.addChild(this._p1Label);
            this.addChild(this._p2Label);
            this.addChild(this._timerLabel);
            Core.GameManager.playScene = this;
        };
        return Level2Scene;
    }(base.Scene));
    scenes.Level2Scene = Level2Scene;
})(scenes || (scenes = {}));
var scenes;
(function (scenes) {
    var Level3Scene = /** @class */ (function (_super) {
        __extends(Level3Scene, _super);
        // Public Properties
        // Constructor
        function Level3Scene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        Level3Scene.prototype.CheckCollisions = function () {
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
        Level3Scene.prototype.displayPopup = function () {
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
        Level3Scene.prototype.generateRandomNumber = function (corodinates) {
            switch (corodinates) {
                case "x":
                    return Math.floor(Math.random() * 610) + 15;
                case "y":
                    return Math.floor(Math.random() * 450) + 15;
            }
        };
        Level3Scene.prototype.updateLables = function () {
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
        Level3Scene.prototype.checkLives = function () {
            if (this._player1 != null) {
                this._player1.Update();
                if (Core.GameManager.P1Health <= 0) {
                    this.removeChild(this._player1);
                    this._player1 = null;
                    Core.GameManager.Level1Winner = "Player2";
                    this._tankSound.stop();
                    Core.GameManager.currentScene = config.Scene.OVER;
                }
            }
            if (this._player2 != null) {
                this._player2.Update();
                if (Core.GameManager.P2Health <= 0) {
                    this.removeChild(this._player2);
                    this._player2 = null;
                    Core.GameManager.Level1Winner = "Player1";
                    this._tankSound.stop();
                    Core.GameManager.currentScene = config.Scene.OVER;
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
        Level3Scene.prototype.setupTankTypes = function () {
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
        Level3Scene.prototype.defineObstacles = function () {
            var _obstacleCounter = 0;
            this._obstacles = new Array();
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25, 105, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615, 375, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(145, 105, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(495, 375, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(265, 25, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(375, 455, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(215, 265, "wood");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(425, 215, "wood");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(265, 145, "wood");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(375, 335, "wood");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(95, 215, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(385, 265, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(95, 265, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(385, 315, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(215, 385, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(425, 95, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(265, 385, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(375, 95, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25, 315, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25, 355, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25, 395, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(65, 315, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(65, 355, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(65, 395, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(85, 415, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(125, 415, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(165, 415, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(85, 455, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(125, 455, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(165, 455, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(105, 315, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(105, 345, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(105, 375, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(135, 375, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(165, 375, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(135, 345, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615, 165, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615, 125, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615, 85, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(575, 165, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(575, 125, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(575, 85, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(555, 65, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(515, 65, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(475, 65, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(555, 25, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(515, 25, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(475, 25, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(535, 165, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(535, 135, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(535, 105, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(505, 105, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(475, 105, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(505, 135, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(195, 75, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(230, 75, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(260, 75, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(295, 75, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(325, 75, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(195, 95, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(230, 95, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(260, 95, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(295, 95, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(325, 95, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(445, 405, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(410, 405, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(380, 405, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(345, 405, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(315, 405, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(445, 385, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(410, 385, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(380, 385, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(345, 385, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(315, 385, "grass");
        };
        Level3Scene.prototype.loadbstacles = function () {
            var i = 0;
            while (this._obstacles[i] != null) {
                this.addChild(this._obstacles[i++]);
            }
        };
        // Public Methods
        // Initialize Game Variables and objects
        Level3Scene.prototype.Start = function () {
            Core.GameManager.Timer = 90;
            this._frameCounter = 0;
            this._background = new Levels.Background("bg3");
            this._p1Label = new base.Label("Player1: " + Core.GameManager.P1Health, "16px", "Consolas", "#000000", 100, 15, true);
            this._p2Label = new base.Label("Player2: " + Core.GameManager.P2Health, "16px", "Consolas", "#000000", 600, 15, true);
            this._timerLabel = new base.Label("|" + Core.GameManager.Timer + "|", "16px", "Consolas", "#000000", 320, 15, true);
            this.setupTankTypes();
            this._tankSound = createjs.Sound.play("level3sd");
            this._tankSound.loop = -1;
            this._tankSound.volume = 0.7;
            this._mine = new Levels.PopUp(5000, 5000, "mine");
            this._star = new Levels.PopUp(5000, 5000, "star");
            this._range = new Levels.PopUp(5000, 5000, "range");
            this._health = new Levels.PopUp(5000, 5000, "health");
            this.defineObstacles();
            this.Main();
        };
        Level3Scene.prototype.Update = function () {
            this.CheckCollisions();
            this.updateLables();
            this._background.Update();
            this.checkLives();
            this._player1 = Core.GameManager.P1Tank;
            this._player2 = Core.GameManager.P2Tank;
        };
        // This is where the fun happens
        Level3Scene.prototype.Main = function () {
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
        return Level3Scene;
    }(base.Scene));
    scenes.Level3Scene = Level3Scene;
})(scenes || (scenes = {}));
var scenes;
(function (scenes) {
    var OverScene = /** @class */ (function (_super) {
        __extends(OverScene, _super);
        // Public Properties
        // Constructor
        function OverScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        OverScene.prototype._backButtonClick = function () {
            Core.GameManager.currentScene = config.Scene.LEVEL1;
        };
        // Public Methods
        // Initialize Game Variables and objects
        OverScene.prototype.Start = function () {
            this._overLabel = new base.Label("The Winner is: " + Core.GameManager.Level1Winner, "30px", "Consolas", "#e5e5e5", 320, 240, true);
            this._backButton = new base.Button("backButton", 320, 340);
            this._background = new Levels.Background("gameOver");
            this.Main();
        };
        OverScene.prototype.Update = function () {
        };
        // This is where the fun happens
        OverScene.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._overLabel);
            // add the backButton to the scene
            this.addChild(this._backButton);
            // event listeners
            this._backButton.on("click", this._backButtonClick);
        };
        return OverScene;
    }(base.Scene));
    scenes.OverScene = OverScene;
})(scenes || (scenes = {}));
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
        StartScene.prototype._setPlayerSelection = function (eventObject) {
            switch (eventObject.target.name) {
                case "p1heavy":
                    Core.GameManager.Player1TankType = config.tankTypes.HEAVY; //GOOD
                    //(this.getChildAt(0) as base.Button).setCoordination(100,200);
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
            Core.GameManager.Player1TankType = null;
            Core.GameManager.Player2TankType = null;
            // this._selectionShadow = new base.Button("selection", 100, 100);
            this._background = new Levels.Background("start");
            this._player1 = new base.Label("Player1:", "24px", "Consolas", "#000000", 100, 50, true);
            this._p1Heavy = new base.Button("p1heavy", 200, 100);
            this._p1Medium = new base.Button("p1medium", 300, 100);
            this._p1Light = new base.Button("p1light", 400, 100);
            this._player2 = new base.Label("Player2:", "24px", "Consolas", "#000000", 100, 200, true);
            this._p2Heavy = new base.Button("p2heavy", 200, 250);
            this._p2Medium = new base.Button("p2medium", 300, 250);
            this._p2Light = new base.Button("p2light", 400, 250);
            this._p1Heavy.name = "p1heavy";
            this._p1Medium.name = "p1medium";
            this._p1Light.name = "p1light";
            this._p2Heavy.name = "p2heavy";
            this._p2Medium.name = "p2medium";
            this._p2Light.name = "p2light";
            this._startButton = new base.Button("startButton", 300, 400);
            this.Main();
        };
        StartScene.prototype.Update = function () {
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
var base;
(function (base) {
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        // constructors
        function Bullet(x, y, angel, speed, range, power) {
            var _this = _super.call(this, "bullet") || this;
            _this._initX = x;
            _this._initY = y;
            _this._angel = angel;
            _this._speed = speed;
            _this._range = range;
            _this._power = power;
            _this.x = x;
            _this.y = y;
            _this.Start();
            return _this;
        }
        // public properties
        Bullet.prototype.IsBulletOut = function () {
            var P1 = new math.Vec2(this.x, this.y);
            var P2 = new math.Vec2(this._initX, this._initY);
            if ((this.x >= 640 + this.HalfWidth) || (this.x <= -this.HalfWidth)
                || (this.y <= -this.HalfHeight) || (this.y >= 480 + this.HalfHeight)) {
                this.x = 10000;
                this.y = 10000;
            }
            else if (math.Vec2.Distance(P1, P2) > this._range) {
                this.x = 10000;
                this.y = 10000;
            }
        };
        // private methods
        // public methods
        Bullet.prototype.Start = function () {
        };
        Bullet.prototype.Update = function () {
            this.Move();
            this.IsBulletOut();
            //
        };
        Bullet.prototype.Fire = function (InitX, InitY) {
            this._initX = InitX;
            this._initY = InitY;
            this.x = InitX;
            this.y = InitY;
        };
        Bullet.prototype.Move = function () {
            switch (this._angel) {
                case -45:
                    this.x -= this._speed;
                    this.y -= this._speed;
                    break;
                case -90:
                    this.x -= this._speed;
                    break;
                case -135:
                    this.x -= this._speed;
                    this.y += this._speed;
                    break;
                case +45:
                    this.x += this._speed;
                    this.y -= this._speed;
                    break;
                case 90:
                    this.x += this._speed;
                    break;
                case +135:
                    this.x += this._speed;
                    this.y += this._speed;
                    break;
                case 180:
                    this.y += this._speed;
                    break;
                case 0:
                    this.y -= this._speed;
                    break;
            }
        };
        return Bullet;
    }(base.GameObject));
    base.Bullet = Bullet;
})(base || (base = {}));
var base;
(function (base) {
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        // Private Instance Variables
        // Public Properties
        // Constructor
        function Button(imageString, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this, Core.GameManager.assetManager.getResult(imageString)) || this;
            _this.regX = _this.getBounds().width * 0.5;
            _this.regY = _this.getBounds().height * 0.5;
            _this.name = imageString;
            _this.x = x;
            _this.y = y;
            _this.on("mouseover", _this._mouseOver);
            _this.on("mouseout", _this._mouseOut);
            return _this;
        }
        // Private Methods
        Button.prototype._mouseOver = function () {
            this.alpha = 0.7;
        };
        Button.prototype._mouseOut = function () {
            this.alpha = 1.0;
        };
        // Public Methods
        Button.prototype.setCoordination = function (x, y) {
            this.x = x;
            this.y = y;
        };
        return Button;
    }(createjs.Bitmap));
    base.Button = Button;
})(base || (base = {}));
var base;
(function (base) {
    //export class GameObject extends createjs.Bitmap {
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        // constructors
        function GameObject(imageString) {
            var _this = 
            //super(Core.GameManager.assetManager.getResult(imageString));
            _super.call(this, Core.GameManager.textureAtlas, imageString) || this;
            _this._initialize();
            return _this;
        }
        // private methods
        GameObject.prototype._initialize = function () {
            this.UpdateProperties();
            this.IsColliding = false;
            this.onExplosion = false;
            this.Life = 100; // Different from tank's health value
        };
        // public methods
        GameObject.prototype.UpdateProperties = function () {
            this.Width = this.getBounds().width;
            this.Height = this.getBounds().height;
            this.HalfWidth = this.Width * 0.5;
            this.HalfHeight = this.Height * 0.5;
            this.regX = this.HalfWidth;
            this.regY = this.HalfHeight;
        };
        return GameObject;
    }(createjs.Sprite));
    base.GameObject = GameObject;
})(base || (base = {}));
var base;
(function (base) {
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        // Public Propoerties
        // Constructor
        function Label(labelString, fontSize, fontFamily, fontColour, x, y, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, "PLACEHOLDER", fontSize + " " + fontFamily, fontColour) || this;
            _this._isCentered = isCentered;
            _this._locationX = x;
            _this._locationY = y;
            _this.SetText(labelString);
            return _this;
            //this.x = x;
            //this.y = y;
        }
        // Private Methods
        // Public Methods
        Label.prototype.SetText = function (text) {
            this.text = text;
            //this.textAlign = "center";
            if (this._isCentered) {
                this.regX = this.getMeasuredWidth() * 0.5;
                this.regY = this.getMeasuredHeight() * 0.5;
            }
            this.x = this._locationX;
            this.y = this._locationY;
        };
        return Label;
    }(createjs.Text));
    base.Label = Label;
})(base || (base = {}));
var base;
(function (base) {
    var Scene = /** @class */ (function (_super) {
        __extends(Scene, _super);
        // Constructor
        function Scene() {
            var _this = _super.call(this) || this;
            _this.assetManager = Core.GameManager.assetManager;
            return _this;
        }
        // Private Methods
        // Public Methods
        Scene.prototype.Start = function () {
        };
        Scene.prototype.Update = function () {
        };
        Scene.prototype.Main = function () {
        };
        return Scene;
    }(createjs.Container));
    base.Scene = Scene;
})(base || (base = {}));
var base;
(function (base) {
    var Tank = /** @class */ (function (_super) {
        __extends(Tank, _super);
        // constructors
        function Tank(imageString, name, tanktype) {
            var _this = _super.call(this, imageString) || this;
            _this.name = name;
            _this._tankType = tanktype;
            _this.setupPlayer();
            _this.setupTank();
            return _this;
        }
        // private methods
        //setup tank types
        Tank.prototype.setupTank = function () {
            this.TankLife = 100;
            switch (this._tankType) {
                case config.tankTypes.HEAVY:
                    this.TankSpeed = Core.GameManager.H_tank_speed;
                    this.BulletSpeed = Core.GameManager.H_bullet_speed;
                    this.BulletRange = Core.GameManager.H_bullet_range;
                    this.BulletPower = Core.GameManager.H_bullet_power;
                    break;
                case config.tankTypes.MEDIUM:
                    this.TankSpeed = Core.GameManager.M_tank_speed;
                    this.BulletSpeed = Core.GameManager.M_bullet_speed;
                    this.BulletRange = Core.GameManager.M_bullet_range;
                    this.BulletPower = Core.GameManager.M_bullet_power;
                    break;
                case config.tankTypes.LIGHT:
                    this.TankSpeed = Core.GameManager.L_tank_speed;
                    this.BulletSpeed = Core.GameManager.L_bullet_speed;
                    this.BulletRange = Core.GameManager.L_bullet_range;
                    this.BulletPower = Core.GameManager.L_bullet_power;
                    break;
            }
        };
        //setup player specific properties
        Tank.prototype.setupPlayer = function () {
            switch (this.name) {
                case "Player1":
                    this.Bullet = new objects.Bullet1(10000, 10000, 1, 0, 0, 0);
                    this.y = 430;
                    this.x = 200;
                    Core.GameManager.P1Health = 100;
                    break;
                case "Player2":
                    this.Bullet = new objects.Bullet2(10000, 10000, 1, 0, 0, 0);
                    this.y = 130;
                    this.x = 200;
                    Core.GameManager.P2Health = 100;
                    break;
            }
        };
        //fires the bullet
        Tank.prototype.fire = function () {
            this.Bullet.Fire(this.x, this.y);
            this.Bullet._angel = this.rotation;
            this.Bullet._speed = this.BulletSpeed;
            this.Bullet._power = this.BulletPower;
            this.Bullet._range = this.BulletRange;
        };
        // setup controllers & detects pressed keys using keyboard manager
        Tank.prototype.setController = function () {
            if (this.name == "Player1") {
                this.MoveLeft = Core.GameManager.keyboardManager.P1Left;
                this.MoveRight = Core.GameManager.keyboardManager.P1Right;
                this.MoveUp = Core.GameManager.keyboardManager.P1Up;
                this.MoveDown = Core.GameManager.keyboardManager.P1Down;
                this.StartFire = Core.GameManager.keyboardManager.P1Fire;
            }
            else if (this.name == "Player2") {
                this.MoveLeft = Core.GameManager.keyboardManager.P2Left;
                this.MoveRight = Core.GameManager.keyboardManager.P2Right;
                this.MoveUp = Core.GameManager.keyboardManager.P2Up;
                this.MoveDown = Core.GameManager.keyboardManager.P2Down;
                this.StartFire = Core.GameManager.keyboardManager.P2Fire;
            }
        };
        //check bounds to avoid tanks go out of canvas
        Tank.prototype.checkBounds = function () {
            //right boundary
            if (this.x >= 640 - this.HalfWidth) {
                this.x = 640 - this.HalfWidth;
            }
            // left boundary
            if (this.x <= this.HalfWidth) {
                this.x = this.HalfWidth;
            }
            // up boundary
            if (this.y <= this.HalfHeight) {
                this.y = this.HalfHeight;
            }
            // down boundary
            if (this.y >= 480 - this.HalfHeight) {
                this.y = 480 - this.HalfHeight;
            }
        };
        //detects tank movements & moves the tank
        Tank.prototype.move = function () {
            this.setController();
            if ((this.MoveLeft) && (this.MoveUp)) {
                this.x -= this.TankSpeed;
                this.y -= this.TankSpeed;
                this.rotation = -45;
            }
            else if ((this.MoveLeft) && (this.MoveDown)) {
                this.x -= this.TankSpeed;
                this.y += this.TankSpeed;
                this.rotation = -135;
            }
            else if ((this.MoveRight) && (this.MoveDown)) {
                this.x += this.TankSpeed;
                this.y += this.TankSpeed;
                this.rotation = 135;
            }
            else if ((this.MoveRight) && (this.MoveUp)) {
                this.x += this.TankSpeed;
                this.y -= this.TankSpeed;
                this.rotation = 45;
            }
            else if (this.MoveLeft) {
                this.x -= this.TankSpeed;
                this.rotation = -90;
            }
            else if (this.MoveRight) {
                this.x += this.TankSpeed;
                this.rotation = 90;
            }
            else if (this.MoveUp) {
                this.y -= this.TankSpeed;
                this.rotation = 0;
            }
            else if (this.MoveDown) {
                this.y += this.TankSpeed;
                this.rotation = 180;
            }
            else if (this.StartFire) {
                if (this.Bullet.x == 10000) {
                    var sound = createjs.Sound.play("fire");
                    sound.volume = 0.1;
                    this.fire();
                }
            }
        };
        // public methods
        Tank.prototype.Update = function () {
            this.move();
            this.checkBounds();
            if (this.Bullet != null) {
                if (this.Bullet.x != 10000) {
                    this.Bullet.Update();
                }
            }
        };
        return Tank;
    }(base.GameObject));
    base.Tank = Tank;
})(base || (base = {}));
var config;
(function (config) {
    var Controllers = /** @class */ (function () {
        function Controllers() {
        }
        //Player1
        Controllers.P1_LEFT = 'a';
        Controllers.P1_RIGHT = 'd';
        Controllers.P1_UP = 'w';
        Controllers.P1_DOWN = 's';
        Controllers.P1_FIRE = 'q';
        //Player2
        Controllers.P2_LEFT = 'j';
        Controllers.P2_RIGHT = 'l';
        Controllers.P2_UP = 'i';
        Controllers.P2_DOWN = 'k';
        Controllers.P2_FIRE = 'p';
        return Controllers;
    }());
    config.Controllers = Controllers;
})(config || (config = {}));
var config;
(function (config) {
    var Scene;
    (function (Scene) {
        Scene[Scene["START"] = 0] = "START";
        Scene[Scene["LOAD"] = 1] = "LOAD";
        Scene[Scene["TRANSFER"] = 2] = "TRANSFER";
        Scene[Scene["LEVEL1"] = 3] = "LEVEL1";
        Scene[Scene["LEVEL2"] = 4] = "LEVEL2";
        Scene[Scene["LEVEL3"] = 5] = "LEVEL3";
        Scene[Scene["OVER"] = 6] = "OVER";
    })(Scene = config.Scene || (config.Scene = {}));
})(config || (config = {}));
var config;
(function (config) {
    var tankTypes;
    (function (tankTypes) {
        tankTypes[tankTypes["HEAVY"] = 0] = "HEAVY";
        tankTypes[tankTypes["MEDIUM"] = 1] = "MEDIUM";
        tankTypes[tankTypes["LIGHT"] = 2] = "LIGHT";
    })(tankTypes = config.tankTypes || (config.tankTypes = {}));
})(config || (config = {}));
var Core;
(function (Core) {
    var GameManager = /** @class */ (function () {
        function GameManager() {
        }
        // Tanks Properties
        GameManager.H_tank_speed = 1.5;
        GameManager.H_bullet_range = 400;
        GameManager.H_bullet_speed = 1.5;
        GameManager.H_bullet_power = 50;
        GameManager.M_tank_speed = 1.5;
        GameManager.M_bullet_range = 300;
        GameManager.M_bullet_speed = 3;
        GameManager.M_bullet_power = 40;
        GameManager.L_tank_speed = 1.5;
        GameManager.L_bullet_range = 200;
        GameManager.L_bullet_speed = 1.5;
        GameManager.L_bullet_power = 25;
        return GameManager;
    }());
    Core.GameManager = GameManager;
})(Core || (Core = {}));
var managers;
(function (managers) {
    var KeyboardManager = /** @class */ (function () {
        // Constructors
        function KeyboardManager() {
            this.enabled = false;
            this.P1Left = false;
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        }
        // private methods
        // public methods
        KeyboardManager.prototype.onKeyDown = function (event) {
            switch (event.key) {
                case config.Controllers.P1_UP:
                    this.P1Up = true;
                    break;
                case config.Controllers.P1_LEFT:
                    this.P1Left = true;
                    break;
                case config.Controllers.P1_DOWN:
                    this.P1Down = true;
                    break;
                case config.Controllers.P1_RIGHT:
                    this.P1Right = true;
                    break;
                case config.Controllers.P1_FIRE:
                    this.P1Fire = true;
                    break;
                case config.Controllers.P2_UP:
                    this.P2Up = true;
                    break;
                case config.Controllers.P2_LEFT:
                    this.P2Left = true;
                    break;
                case config.Controllers.P2_DOWN:
                    this.P2Down = true;
                    break;
                case config.Controllers.P2_RIGHT:
                    this.P2Right = true;
                    break;
                case config.Controllers.P2_FIRE:
                    this.P2Fire = true;
                    break;
            }
        };
        KeyboardManager.prototype.onKeyUp = function (event) {
            switch (event.key) {
                case config.Controllers.P1_UP:
                    this.P1Up = false;
                    break;
                case config.Controllers.P1_LEFT:
                    this.P1Left = false;
                    break;
                case config.Controllers.P1_DOWN:
                    this.P1Down = false;
                    break;
                case config.Controllers.P1_RIGHT:
                    this.P1Right = false;
                    break;
                case config.Controllers.P1_FIRE:
                    this.P1Fire = false;
                    break;
                case config.Controllers.P2_UP:
                    this.P2Up = false;
                    break;
                case config.Controllers.P2_LEFT:
                    this.P2Left = false;
                    break;
                case config.Controllers.P2_DOWN:
                    this.P2Down = false;
                    break;
                case config.Controllers.P2_RIGHT:
                    this.P2Right = false;
                    break;
                case config.Controllers.P2_FIRE:
                    this.P2Fire = false;
                    break;
            }
        };
        return KeyboardManager;
    }());
    managers.KeyboardManager = KeyboardManager;
})(managers || (managers = {}));
var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.CheckBullet = function (itSelf, objects, enemyName) {
            // define points for both object1 and object2
            var i = 0;
            var P1 = new math.Vec2(itSelf.x, itSelf.y);
            while (objects[i] != null) {
                var P2 = new math.Vec2(objects[i].x, objects[i].y);
                // check if there is a collision
                if ((math.Vec2.Distance(P1, P2) < (itSelf.HalfHeight + objects[i].HalfHeight))
                    || (math.Vec2.Distance(P1, P2) < (itSelf.HalfWidth + objects[i].HalfWidth))) {
                    if (!objects[i].IsColliding) {
                        objects[i].IsColliding = true;
                        switch (objects[i].name) {
                            case enemyName:
                                if (enemyName == "Player2") {
                                    if (Core.GameManager.Timer < 30 || Core.GameManager.P2Health <= itSelf._power) {
                                        Core.GameManager.P2Health = 0;
                                    }
                                    else {
                                        Core.GameManager.P2Health -= itSelf._power;
                                    }
                                }
                                else if (enemyName == "Player1") {
                                    if (Core.GameManager.Timer < 30 || Core.GameManager.P1Health <= itSelf._power) {
                                        Core.GameManager.P1Health = 0;
                                    }
                                    else {
                                        Core.GameManager.P1Health -= itSelf._power;
                                    }
                                }
                                this._sound = createjs.Sound.play("explosion");
                                this._sound.volume = 0.1;
                                break;
                            case "stone":
                            case "house":
                                this._sound = createjs.Sound.play("explosion3");
                                this._sound.volume = 0.1;
                                break;
                            case "wood":
                                this._sound = createjs.Sound.play("explosion2");
                                this._sound.volume = 0.1;
                                objects[i].Life -= 35;
                                (objects[i].Life == 65) ? objects[i].gotoAndPlay("wood2") : objects[i].gotoAndPlay("wood3");
                                break;
                            case "mine":
                                this._sound = createjs.Sound.play("explosion");
                                this._sound.volume = 0.1;
                                objects[i].x = 5000;
                                objects[i].y = 5000;
                                objects[i].IsColliding = false;
                                break;
                            case "star":
                                this._sound = createjs.Sound.play("starsd");
                                this._sound.volume = 0.1;
                                objects[i].x = 5000;
                                objects[i].y = 5000;
                                objects[i].IsColliding = false;
                                if (enemyName == "Player2")
                                    Core.GameManager.P1Tank.TankSpeed += 0.2;
                                if (enemyName == "Player1")
                                    Core.GameManager.P2Tank.TankSpeed += 0.2;
                                break;
                            case "health":
                                this._sound = createjs.Sound.play("powerup");
                                this._sound.volume = 0.1;
                                objects[i].x = 5000;
                                objects[i].y = 5000;
                                objects[i].IsColliding = false;
                                if (enemyName == "Player2")
                                    Core.GameManager.P1Health = 100;
                                if (enemyName == "Player1")
                                    Core.GameManager.P2Health = 100;
                                break;
                            case "range":
                                this._sound = createjs.Sound.play("rangesd");
                                this._sound.volume = 0.1;
                                objects[i].x = 5000;
                                objects[i].y = 5000;
                                objects[i].IsColliding = false;
                                if (enemyName == "Player2")
                                    Core.GameManager.P1Tank.BulletRange += 40;
                                if (enemyName == "Player1")
                                    Core.GameManager.P2Tank.BulletRange += 40;
                                break;
                            default:
                                continue;
                        }
                        itSelf.x = 10000;
                        itSelf.y = 10000;
                    }
                }
                else {
                    objects[i].IsColliding = false;
                }
                ++i;
            }
        };
        Collision.CheckTank = function (itSelf, objects, enemyName) {
            // define points for both object1 and object2
            var i = 0;
            var P1 = new math.Vec2(itSelf.x, itSelf.y);
            while (objects[i] != null) {
                var P2 = new math.Vec2(objects[i].x, objects[i].y);
                // check if there is a collision
                if ((math.Vec2.Distance(P1, P2) < (itSelf.HalfHeight + objects[i].HalfHeight))
                    || (math.Vec2.Distance(P1, P2) < (itSelf.HalfWidth + objects[i].HalfWidth))) {
                    if (itSelf.name == objects[i].name) {
                        ++i;
                        continue;
                    }
                    if (!objects[i].IsColliding) {
                        objects[i].IsColliding = true;
                        switch (objects[i].name) {
                            case "stone":
                            case "wood":
                            case "sea":
                            case "house":
                            case enemyName:
                                this.forceOut(itSelf, objects[i]);
                                //Customize if required
                                break;
                            case "mine":
                                if ((Core.GameManager.P1Health != 0) && (Core.GameManager.P2Health != 0)) {
                                    this._sound = createjs.Sound.play("explosion");
                                    this._sound.volume = 0.1;
                                }
                                if (enemyName == "Player2")
                                    Core.GameManager.P1Health = 0;
                                if (enemyName == "Player1")
                                    Core.GameManager.P2Health = 0;
                                break;
                            case "star":
                                createjs.Sound.play("starsd");
                                objects[i].x = 5000;
                                objects[i].y = 5000;
                                objects[i].IsColliding = false;
                                if (enemyName == "Player2")
                                    Core.GameManager.P1Tank.TankSpeed += 0.2;
                                if (enemyName == "Player1")
                                    Core.GameManager.P2Tank.TankSpeed += 0.2;
                                break;
                            case "health":
                                createjs.Sound.play("powerup");
                                objects[i].x = 5000;
                                objects[i].y = 5000;
                                objects[i].IsColliding = false;
                                if (enemyName == "Player2")
                                    Core.GameManager.P1Health = 100;
                                if (enemyName == "Player1")
                                    Core.GameManager.P2Health = 100;
                                break;
                            case "range":
                                createjs.Sound.play("rangesd");
                                objects[i].x = 5000;
                                objects[i].y = 5000;
                                objects[i].IsColliding = false;
                                if (enemyName == "Player2")
                                    Core.GameManager.P1Tank.BulletRange += 40;
                                if (enemyName == "Player1")
                                    Core.GameManager.P2Tank.BulletRange += 40;
                                break;
                        }
                    }
                }
                else {
                    objects[i].IsColliding = false;
                }
                ++i;
            }
        };
        Collision.forceOut = function (tank, obstacle) {
            if (tank.name == "Player1")
                switch (tank.rotation) {
                    case 0:
                        Core.GameManager.keyboardManager.P1Up = false;
                        break;
                    case -45:
                        Core.GameManager.keyboardManager.P1Left = false;
                        Core.GameManager.keyboardManager.P1Up = false;
                        break;
                    case -90:
                        Core.GameManager.keyboardManager.P1Left = false;
                        break;
                    case 90:
                        Core.GameManager.keyboardManager.P1Right = false;
                        break;
                    case 180:
                        Core.GameManager.keyboardManager.P1Down = false;
                        break;
                    case 45:
                        Core.GameManager.keyboardManager.P1Right = false;
                        Core.GameManager.keyboardManager.P1Up = false;
                        break;
                    case -135:
                        Core.GameManager.keyboardManager.P1Left = false;
                        Core.GameManager.keyboardManager.P1Down = false;
                        break;
                    case 135:
                        Core.GameManager.keyboardManager.P1Right = false;
                        Core.GameManager.keyboardManager.P1Down = false;
                        break;
                }
            if (tank.name == "Player2")
                switch (tank.rotation) {
                    case 0:
                        Core.GameManager.keyboardManager.P2Up = false;
                        break;
                    case -45:
                        Core.GameManager.keyboardManager.P2Left = false;
                        Core.GameManager.keyboardManager.P2Up = false;
                        break;
                    case -90:
                        Core.GameManager.keyboardManager.P2Left = false;
                        break;
                    case 90:
                        Core.GameManager.keyboardManager.P2Right = false;
                        break;
                    case 180:
                        Core.GameManager.keyboardManager.P2Down = false;
                        break;
                    case 45:
                        Core.GameManager.keyboardManager.P2Right = false;
                        Core.GameManager.keyboardManager.P2Up = false;
                        break;
                    case -135:
                        Core.GameManager.keyboardManager.P2Left = false;
                        Core.GameManager.keyboardManager.P2Down = false;
                        break;
                    case 135:
                        Core.GameManager.keyboardManager.P2Right = false;
                        Core.GameManager.keyboardManager.P2Down = false;
                        break;
                }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
/*
 if ((tank.x < obstacle.x) && (tank.rotation >= 45) && (tank.rotation <= 135)) {
   tank.x = obstacle.x - obstacle.HalfWidth - tank.HalfWidth - 2;
 }
 else if ((tank.x > obstacle.x) && (tank.rotation <= -45) && (tank.rotation >= -135)) {
   tank.x = obstacle.x + obstacle.HalfWidth + tank.HalfWidth + 2;
 }
 else if ((tank.y > obstacle.y)) {
   tank.y = obstacle.y + obstacle.HalfHeight + tank.HalfHeight + 2;
 }
 else {
   tank.y = obstacle.y - obstacle.HalfHeight - tank.HalfHeight - 2;
 }
 */ 
var Levels;
(function (Levels) {
    var Background = /** @class */ (function (_super) {
        __extends(Background, _super);
        // private instance variables
        // public properties
        // Constructor
        function Background(imageString) {
            var _this = _super.call(this, Core.GameManager.assetManager.getResult(imageString)) || this;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        // Initializes variables and creates new objects
        Background.prototype.Start = function () {
        };
        // updates the game object every frame
        Background.prototype.Update = function () {
        };
        return Background;
    }(createjs.Bitmap));
    Levels.Background = Background;
})(Levels || (Levels = {}));
var Levels;
(function (Levels) {
    var Obstacle = /** @class */ (function (_super) {
        __extends(Obstacle, _super);
        // private instance variables
        // public properties
        // Constructor
        function Obstacle(x, y, name) {
            var _this = _super.call(this, name) || this;
            _this.x = x;
            _this.y = y;
            _this.name = name;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        // Initializes variables and creates new objects
        Obstacle.prototype.Start = function () {
        };
        // updates the game object every frame
        Obstacle.prototype.Update = function () {
        };
        return Obstacle;
    }(base.GameObject));
    Levels.Obstacle = Obstacle;
})(Levels || (Levels = {}));
var Levels;
(function (Levels) {
    var PopUp = /** @class */ (function (_super) {
        __extends(PopUp, _super);
        // Constructor
        function PopUp(x, y, name) {
            var _this = _super.call(this, name) || this;
            _this.x = x;
            _this.y = y;
            _this.name = name;
            _this.Start();
            _this.Display = false;
            return _this;
        }
        // private methods
        // public methods
        // Initializes variables and creates new objects
        PopUp.prototype.Start = function () {
        };
        // updates the game object every frame
        PopUp.prototype.Update = function () {
        };
        return PopUp;
    }(base.GameObject));
    Levels.PopUp = PopUp;
})(Levels || (Levels = {}));
var math;
(function (math) {
    var Vec2 = /** @class */ (function (_super) {
        __extends(Vec2, _super);
        //private instance variables
        //public properties
        // constructors
        function Vec2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            return _super.call(this, x, y) || this;
        }
        // private methods
        // public methods
        // calculates the distance between two Vec2 objects
        Vec2.Distance = function (P1, P2) {
            return Math.floor(Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2)));
        };
        return Vec2;
    }(createjs.Point));
    math.Vec2 = Vec2;
})(math || (math = {}));
var objects;
(function (objects) {
    var Bullet1 = /** @class */ (function (_super) {
        __extends(Bullet1, _super);
        // private instance variables
        // public properties
        // Constructor
        function Bullet1(x, y, angel, speed, range, power) {
            var _this = _super.call(this, x, y, angel, speed, range, power) || this;
            _this.name = "Bullet1";
            return _this;
        }
        return Bullet1;
    }(base.Bullet));
    objects.Bullet1 = Bullet1;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Bullet2 = /** @class */ (function (_super) {
        __extends(Bullet2, _super);
        // private instance variables
        // public properties
        // Constructor
        function Bullet2(x, y, angel, speed, range, power) {
            var _this = _super.call(this, x, y, angel, speed, range, power) || this;
            _this.name = "Bullet2";
            return _this;
        }
        return Bullet2;
    }(base.Bullet));
    objects.Bullet2 = Bullet2;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var P2Heavy = /** @class */ (function (_super) {
        __extends(P2Heavy, _super);
        // private instance variables
        // public properties
        // Constructor
        function P2Heavy() {
            return _super.call(this, "p2heavy", "Player2", config.tankTypes.HEAVY) || this;
        }
        return P2Heavy;
    }(base.Tank));
    objects.P2Heavy = P2Heavy;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var P1Heavy = /** @class */ (function (_super) {
        __extends(P1Heavy, _super);
        // private instance variables
        // public properties
        // Constructor
        function P1Heavy() {
            return _super.call(this, "p1heavy", "Player1", config.tankTypes.HEAVY) || this;
        }
        return P1Heavy;
    }(base.Tank));
    objects.P1Heavy = P1Heavy;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var P1Medium = /** @class */ (function (_super) {
        __extends(P1Medium, _super);
        // private instance variables
        // public properties
        // Constructor
        function P1Medium() {
            return _super.call(this, "p1medium", "Player1", config.tankTypes.MEDIUM) || this;
        }
        return P1Medium;
    }(base.Tank));
    objects.P1Medium = P1Medium;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var P2Medium = /** @class */ (function (_super) {
        __extends(P2Medium, _super);
        // private instance variables
        // public properties
        // Constructor
        function P2Medium() {
            return _super.call(this, "p2medium", "Player2", config.tankTypes.MEDIUM) || this;
        }
        return P2Medium;
    }(base.Tank));
    objects.P2Medium = P2Medium;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var P1Light = /** @class */ (function (_super) {
        __extends(P1Light, _super);
        // private instance variables
        // public properties
        // Constructor
        function P1Light() {
            return _super.call(this, "p1light", "Player1", config.tankTypes.LIGHT) || this;
        }
        return P1Light;
    }(base.Tank));
    objects.P1Light = P1Light;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var P2Light = /** @class */ (function (_super) {
        __extends(P2Light, _super);
        // private instance variables
        // public properties
        // Constructor
        function P2Light() {
            return _super.call(this, "p2light", "Player2", config.tankTypes.LIGHT) || this;
        }
        return P2Light;
    }(base.Tank));
    objects.P2Light = P2Light;
})(objects || (objects = {}));
var scenes;
(function (scenes) {
    var OverScene = /** @class */ (function (_super) {
        __extends(OverScene, _super);
        // Public Properties
        // Constructor
        function OverScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        OverScene.prototype._backButtonClick = function () {
            Core.GameManager.transferTarget = config.Scene.LEVEL1;
            Core.GameManager.currentScene = config.Scene.TRANSFER;
        };
        // Public Methods
        // Initialize Game Variables and objects
        OverScene.prototype.Start = function () {
            var _p1Score = 0;
            var _p2Score = 0;
            var _winner = "N/A";
            (Core.GameManager.Level1Winner == "Player1") ? ++_p1Score : ++_p2Score;
            (Core.GameManager.Level2Winner == "Player1") ? ++_p1Score : ++_p2Score;
            (Core.GameManager.Level3Winner == "Player1") ? ++_p1Score : ++_p2Score;
            _winner = (_p1Score > _p2Score) ? "Player1" : "Player2";
            this._overLabel = new base.Label("The Winner is: " + _winner, "30px", "Impact", "#e5e5e5", 320, 240, true);
            this._backButton = new base.Button("backButton", 320, 340);
            this._background = new Levels.Background("gameOver");
            this.Main();
        };
        OverScene.prototype.Update = function () {
        };
        // This is where the fun happens
        OverScene.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._overLabel);
            // add the backButton to the scene
            this.addChild(this._backButton);
            // event listeners
            this._backButton.on("click", this._backButtonClick);
        };
        return OverScene;
    }(base.Scene));
    scenes.OverScene = OverScene;
})(scenes || (scenes = {}));
var scenes;
(function (scenes) {
    var Level3Scene = /** @class */ (function (_super) {
        __extends(Level3Scene, _super);
        // Public Properties
        // Constructor
        function Level3Scene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        Level3Scene.prototype.CheckCollisions = function () {
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
        Level3Scene.prototype.displayPopup = function () {
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
        Level3Scene.prototype.generateRandomNumber = function (corodinates) {
            switch (corodinates) {
                case "x":
                    return Math.floor(Math.random() * 610) + 15;
                case "y":
                    return Math.floor(Math.random() * 450) + 15;
            }
        };
        Level3Scene.prototype.updateLables = function () {
            this._frameCounter += 1;
            if (this._frameCounter >= 60) {
                if (Core.GameManager.Timer > 0) {
                    this.displayPopup();
                    Core.GameManager.Timer -= 1;
                }
                this._frameCounter = 0;
            }
            this._p1Label.text = "P1: " + Core.GameManager.P1Health;
            this._p2Label.text = "P2: " + Core.GameManager.P2Health;
            if (Core.GameManager.Timer < 30) {
                this._timerLabel.text = ".:Last Shot:.";
            }
            else {
                this._timerLabel.text = "|" + Core.GameManager.Timer + "|";
            }
        };
        Level3Scene.prototype.checkLives = function () {
            if (this._player1 != null) {
                this._player1.Update();
                if (Core.GameManager.P1Health <= 0 && !this._player1.onExplosion) {
                    this._player1.gotoAndPlay("explosion");
                    this._player1.onExplosion = true;
                    // this._player1.Life = 999;
                }
                if (this._player1.onExplosion && this._player1.paused) {
                    this.removeChild(this._player1);
                    Core.GameManager.Level3Winner = "Player2";
                    this._tankSound.stop();
                    Core.GameManager.transferTarget = config.Scene.OVER;
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
                    Core.GameManager.Level3Winner = "Player1";
                    this._tankSound.stop();
                    Core.GameManager.transferTarget = config.Scene.OVER;
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
        Level3Scene.prototype.setupTankTypes = function () {
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
        Level3Scene.prototype.defineObstacles = function () {
            var _obstacleCounter = 0;
            this._obstacles = new Array();
            // Rock - stony field in the corners
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25, 105, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615, 375, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(145, 105, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(495, 375, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(265, 25, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(375, 455, "stone");
            // Wood - central diamond
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(215, 265, "wood");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(425, 215, "wood");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(265, 145, "wood");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(375, 335, "wood");
            // Houses - vertical
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(95, 215, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(545, 265, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(95, 265, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(545, 215, "house");
            // Houses - horizontal
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(215, 385, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(425, 95, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(265, 385, "house");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(375, 95, "house");
            // Grass - vertical area, bottom left corner
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25, 315, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25, 355, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25, 395, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(65, 315, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(65, 355, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(65, 395, "grass");
            // fill gaps
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(45, 335, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(45, 375, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(85, 335, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(85, 375, "grass");
            // Grass - horizontal area, bottom left corner
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(85, 415, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(125, 415, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(165, 415, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(85, 455, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(125, 455, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(165, 455, "grass");
            // fill gaps
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(105, 435, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(145, 435, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(105, 395, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(145, 395, "grass");
            // Grass - connecting triangle, bottom left corner
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(105, 315, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(105, 345, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(105, 375, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(135, 375, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(165, 375, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(135, 345, "grass");
            // Grass - vertical area, top right corner
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615, 165, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615, 125, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615, 85, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(575, 165, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(575, 125, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(575, 85, "grass");
            // fill gaps
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(595, 145, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(595, 105, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(555, 145, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(555, 105, "grass");
            // Grass - horizontal area, top right corner
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(555, 65, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(515, 65, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(475, 65, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(555, 25, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(515, 25, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(475, 25, "grass");
            // fill gaps
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(535, 45, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(495, 45, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(535, 85, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(495, 85, "grass");
            // Grass - connecting triangle, top right corner
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(535, 165, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(535, 135, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(535, 105, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(505, 105, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(475, 105, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(505, 135, "grass");
            // Grass - top stony field
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(195, 75, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(230, 75, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(260, 75, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(295, 75, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(325, 75, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(195, 95, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(230, 95, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(260, 95, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(295, 95, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(325, 95, "grass");
            // Grass - bottom stony field
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(445, 405, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(410, 405, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(380, 405, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(345, 405, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(315, 405, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(445, 385, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(410, 385, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(380, 385, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(345, 385, "grass");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(315, 385, "grass");
        };
        Level3Scene.prototype.loadbstacles = function () {
            var i = 0;
            while (this._obstacles[i] != null) {
                this.addChild(this._obstacles[i++]);
            }
        };
        // Public Methods
        // Initialize Game Variables and objects
        Level3Scene.prototype.Start = function () {
            Core.GameManager.Timer = 90;
            this._frameCounter = 0;
            this._background = new Levels.Background("bg3");
            this._p1Label = new base.Label("P1: " + Core.GameManager.P1Health, "20px", "Impact", "#843415", 20, 15, false);
            this._p2Label = new base.Label("P2: " + Core.GameManager.P2Health, "20px", "Impact", "#0C491D", 565, 15, false);
            this._timerLabel = new base.Label("|" + Core.GameManager.Timer + "|", "22px", "Impact", "#454950", 320, 15, true);
            this._labelBg = new createjs.Bitmap(Core.GameManager.assetManager.getResult("labelBg"));
            this._labelBg.alpha = 0.5;
            this.setupTankTypes();
            this._tankSound = createjs.Sound.play("level3sd");
            this._tankSound.loop = -1;
            this._tankSound.volume = 0.2;
            this._mine = new Levels.PopUp(5000, 5000, "mine");
            this._star = new Levels.PopUp(5000, 5000, "star");
            this._range = new Levels.PopUp(5000, 5000, "range");
            this._health = new Levels.PopUp(5000, 5000, "health");
            this.defineObstacles();
            this.Main();
        };
        Level3Scene.prototype.Update = function () {
            this.CheckCollisions();
            this.updateLables();
            this._background.Update();
            this.checkLives();
            this._player1 = Core.GameManager.P1Tank;
            this._player2 = Core.GameManager.P2Tank;
        };
        // This is where the fun happens
        Level3Scene.prototype.Main = function () {
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
        return Level3Scene;
    }(base.Scene));
    scenes.Level3Scene = Level3Scene;
})(scenes || (scenes = {}));
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
            this._p1Label.text = "P1: " + Core.GameManager.P1Health;
            this._p2Label.text = "P2: " + Core.GameManager.P2Health;
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
                if (Core.GameManager.P1Health <= 0 && !this._player1.onExplosion) {
                    this._player1.gotoAndPlay("explosion");
                    this._player1.onExplosion = true;
                }
                if (this._player1.onExplosion && this._player1.paused) {
                    this.removeChild(this._player1);
                    Core.GameManager.Level1Winner = "Player2";
                    this._tankSound.stop();
                    Core.GameManager.transferTarget = config.Scene.LEVEL2;
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
                    Core.GameManager.Level1Winner = "Player1";
                    this._tankSound.stop();
                    Core.GameManager.transferTarget = config.Scene.LEVEL2;
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
            // Left rock wall
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(130, 190, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(130, 240, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(130, 290, "stone");
            // Right rock wall
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(510, 190, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(510, 240, "stone");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(510, 290, "stone");
            // Top left water
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(160, 80, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210, 80, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(260, 80, "sea");
            // Bottom left water
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(160, 400, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210, 400, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(260, 400, "sea");
            // Top right water
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(480, 80, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430, 80, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(380, 80, "sea");
            // Bottom right water
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(480, 400, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430, 400, "sea");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(380, 400, "sea");
            // Top left foliage
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(160, 130, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(185, 130, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210, 130, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210, 155, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(180, 155, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(145, 140, "tree");
            // Bottom left foliage
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(160, 350, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(185, 350, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210, 350, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210, 325, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(180, 325, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(145, 340, "tree");
            // Top right foliage
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(480, 130, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(455, 130, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430, 130, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430, 155, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(460, 155, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(495, 140, "tree");
            // Bottom right foliage
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(480, 350, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(455, 350, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430, 350, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430, 325, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(460, 325, "tree");
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(495, 340, "tree");
            // Wood walls
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(260, 130, "wood"); // top left
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(260, 350, "wood"); // bottom left
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(380, 130, "wood"); // top right
            this._obstacles[_obstacleCounter++] = new Levels.Obstacle(380, 350, "wood"); // bottom right
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
            this._p1Label = new base.Label("P1: " + Core.GameManager.P1Health, "20px", "Impact", "#843415", 20, 15, false);
            this._p2Label = new base.Label("P2: " + Core.GameManager.P2Health, "20px", "Impact", "#0C491D", 565, 15, false);
            this._timerLabel = new base.Label("|" + Core.GameManager.Timer + "|", "22px", "Impact", "#454950", 320, 15, true);
            this._labelBg = new createjs.Bitmap(Core.GameManager.assetManager.getResult("labelBg"));
            this._labelBg.alpha = 0.5;
            this.setupTankTypes();
            this._tankSound = createjs.Sound.play("level1sd");
            this._tankSound.loop = -1;
            this._tankSound.volume = 0.2;
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
            this.addChild(this._labelBg);
            this.addChild(this._p1Label);
            this.addChild(this._p2Label);
            this.addChild(this._timerLabel);
            Core.GameManager.playScene = this;
        };
        return Level1Scene;
    }(base.Scene));
    scenes.Level1Scene = Level1Scene;
})(scenes || (scenes = {}));
var scenes;
(function (scenes) {
    var LoadScene = /** @class */ (function (_super) {
        __extends(LoadScene, _super);
        // Public Properties
        // Constructor
        function LoadScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        // Public Methods
        // Initialize Game Variables and objects
        LoadScene.prototype.Start = function () {
            // this._selectionShadow = new base.Button("selection", 100, 100);
            this._background = new Levels.Background("loading");
            this._loadingBar = new base.Label("", "20px", "Impact", "#843415", 30, 420, false);
            this._frameCounter = 0;
            this.Main();
        };
        LoadScene.prototype.Update = function () {
            this._frameCounter += 1;
            if (this._frameCounter >= 3) {
                if (this._loadingBar.text.length < 107) {
                    this._loadingBar.text += "|";
                }
                else {
                    Core.GameManager.transferTarget = config.Scene.LEVEL1;
                    Core.GameManager.currentScene = config.Scene.TRANSFER;
                }
                this._frameCounter = 0;
            }
        };
        // This is where the fun happens
        LoadScene.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._loadingBar);
        };
        return LoadScene;
    }(base.Scene));
    scenes.LoadScene = LoadScene;
})(scenes || (scenes = {}));
var scenes;
(function (scenes) {
    var TransferScene = /** @class */ (function (_super) {
        __extends(TransferScene, _super);
        // Public Properties
        // Constructor
        function TransferScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        // Public Methods
        // Initialize Game Variables and objects
        TransferScene.prototype.Start = function () {
            switch (Core.GameManager.transferTarget) {
                case config.Scene.LOAD:
                    this._background = new Levels.Background("loading");
                    break;
                case config.Scene.LEVEL1:
                    this._background = new Levels.Background("bg1");
                    break;
                case config.Scene.LEVEL2:
                    this._background = new Levels.Background("bg2");
                    break;
                case config.Scene.LEVEL3:
                    this._background = new Levels.Background("bg3");
                    break;
                case config.Scene.OVER:
                    this._background = new Levels.Background("gameOver");
                    break;
            }
            this._background.alpha = 0;
            this._frameCounter = 0;
            this.Main();
        };
        TransferScene.prototype.Update = function () {
            this._frameCounter += 1;
            if (this._frameCounter >= 2) {
                if (this._background.alpha < 1) {
                    this._background.alpha += 0.1;
                }
                else {
                    var taget = Core.GameManager.transferTarget;
                    Core.GameManager.currentScene = taget;
                }
                this._frameCounter = 0;
            }
        };
        // This is where the fun happens
        TransferScene.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._loadingBar);
        };
        return TransferScene;
    }(base.Scene));
    scenes.TransferScene = TransferScene;
})(scenes || (scenes = {}));
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
                Core.GameManager.transferTarget = config.Scene.LOAD;
                Core.GameManager.currentScene = config.Scene.TRANSFER;
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
/// <reference path="../../Scripts/core/gameManager.ts"/>
/// <reference path="../../Scripts/config/scene.ts"/>
/// <reference path="../../Scripts/config/tankTypes.ts"/>
/// <reference path="../../Scripts/config/controllers.ts"/>
/// <reference path="../../Scripts/managers/keyboardManager.ts"/>
/// <reference path="../../Scripts/managers/collisionManager.ts"/>
/// <reference path="../../Scripts/base/label.ts"/>
/// <reference path="../../Scripts/base/button.ts"/>
/// <reference path="../../Scripts/base/scene.ts"/>
/// <reference path="../../Scripts/base/gameobject.ts"/>
/// <reference path="../../Scripts/base/tank.ts"/>
/// <reference path="../../Scripts/base/bullet.ts"/>
/// <reference path="../../Scripts/levels/background.ts"/>
/// <reference path="../../Scripts/levels/obstacle.ts"/>
/// <reference path="../../Scripts/levels/popup.ts"/>
/// <reference path="../../Scripts/tools/vec2.ts"/>
/// <reference path="../../Scripts/objects/bullet1.ts"/>
/// <reference path="../../Scripts/objects/bullet2.ts"/>
/// <reference path="../../Scripts/objects/p2heavy.ts"/>
/// <reference path="../../Scripts/objects/p1heavy.ts"/>
/// <reference path="../../Scripts/objects/p1medium.ts"/>
/// <reference path="../../Scripts/objects/p2medium.ts"/>
/// <reference path="../../Scripts/objects/p1light.ts"/>
/// <reference path="../../Scripts/objects/p2light.ts"/>
/// <reference path="../../Scripts/scenes/over.ts"/>
/// <reference path="../../Scripts/scenes/level3.ts"/>
/// <reference path="../../Scripts/scenes/level2.ts"/>
/// <reference path="../../Scripts/scenes/level1.ts"/>
/// <reference path="../../Scripts/scenes/loading.ts"/>
/// <reference path="../../Scripts/scenes/transfer.ts"/>
/// <reference path="../../Scripts/scenes/start.ts"/>
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
    var keyBoardManager;
    var textureAtlasData;
    var textureAtlas;
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
                "frames": [7, 6, 5, 4, 3, 2, 1],
                "speed": 0.3,
                next: ""
            },
            "grass": {
                "frames": [8]
            },
            "health": {
                "frames": [9, 10],
                "speed": 0.025
            },
            "house": {
                "frames": [11]
            },
            "mine": {
                "frames": [12, 13],
                "speed": 0.025
            },
            "p1heavy": {
                "frames": [14, 15, 16, 17],
                "speed": 0.15
            },
            "p1light": {
                "frames": [18, 19, 20, 21],
                "speed": 0.15
            },
            "p1medium": {
                "frames": [22, 23, 24, 25],
                "speed": 0.15
            },
            "p2heavy": {
                "frames": [26, 27, 28, 29],
                "speed": 0.15
            },
            "p2light": {
                "frames": [30, 31, 32, 33],
                "speed": 0.15
            },
            "p2medium": {
                "frames": [34, 35, 36, 37],
                "speed": 0.15
            },
            "range": {
                "frames": [38, 39],
                "speed": 0.025
            },
            "sea": {
                "frames": [40]
            },
            "star": {
                "frames": [41, 42],
                "speed": 0.025
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
        { id: "atlas", src: "./Assets/sprites/atlas.png" },
        //Buttons
        { id: "startButton", src: "./Assets/images/startButton.png" },
        { id: "backButton", src: "./Assets/images/backButton.png" },
        { id: "p1heavy", src: "./Assets/images/p1heavy.png" },
        { id: "p1medium", src: "./Assets/images/p1medium.png" },
        { id: "p1light", src: "./Assets/images/p1light.png" },
        { id: "p2heavy", src: "./Assets/images/p2heavy.png" },
        { id: "p2medium", src: "./Assets/images/p2medium.png" },
        { id: "p2light", src: "./Assets/images/p2light.png" },
        //Backgrounds
        { id: "bg1", src: "./Assets/images/bg1.png" },
        { id: "bg2", src: "./Assets/images/bg2.png" },
        { id: "bg3", src: "./Assets/images/bg3.png" },
        { id: "start", src: "./Assets/images/start.png" },
        { id: "gameOver", src: "./Assets/images/gameover.png" },
        { id: "labelBg", src: "./Assets/images/labelBg.png" },
        { id: "loading", src: "./Assets/images/loadingBg.png" },
        //Sounds
        { id: "level1sd", src: "./Assets/audio/level1sd.mp3" },
        { id: "level2sd", src: "./Assets/audio/level2sd.mp3" },
        { id: "level3sd", src: "./Assets/audio/level3sd.mp3" },
        { id: "fire", src: "./Assets/audio/fire.mp3" },
        { id: "explosion", src: "./Assets/audio/explosion.mp3" },
        { id: "powerup", src: "./Assets/audio/powerup.wav" },
        { id: "starsd", src: "./Assets/audio/starsd.wav" },
        { id: "rangesd", src: "./Assets/audio/rangesd.wav" },
        { id: "explosion2", src: "./Assets/audio/explosion2.wav" },
        { id: "explosion3", src: "./Assets/audio/explosion3.wav" }
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
        textureAtlasData.images = [Core.GameManager.assetManager.getResult("atlas")];
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
//# sourceMappingURL=game.js.map