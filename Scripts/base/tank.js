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
            this._tankLife = 100;
            switch (this._tankType) {
                case config.tankTypes.HEAVY:
                    this._tankSpeed = Core.GameManager.H_tank_speed;
                    this._bulletSpeed = Core.GameManager.H_bullet_speed;
                    this._bulletRange = Core.GameManager.H_bullet_range;
                    this._bulletPower = Core.GameManager.H_bullet_power;
                    break;
                case config.tankTypes.MEDIUM:
                    this._tankSpeed = Core.GameManager.M_tank_speed;
                    this._bulletSpeed = Core.GameManager.M_bullet_speed;
                    this._bulletRange = Core.GameManager.M_bullet_range;
                    this._bulletPower = Core.GameManager.M_bullet_power;
                    break;
                case config.tankTypes.LIGHT:
                    this._tankSpeed = Core.GameManager.L_tank_speed;
                    this._bulletSpeed = Core.GameManager.L_bullet_speed;
                    this._bulletRange = Core.GameManager.L_bullet_range;
                    this._bulletPower = Core.GameManager.L_bullet_power;
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
            this.Bullet.x = this.x;
            this.Bullet.y = this.y;
            this.Bullet._angel = this.rotation;
            this.Bullet._speed = this._bulletSpeed;
            this.Bullet._power = this._bulletPower;
            this.Bullet._range = this._bulletRange;
        };
        // setup controllers & detects pressed keys using keyboard manager
        Tank.prototype.setController = function () {
            if (this.name == "Player1") {
                this._moveLeft = Core.GameManager.keyboardManager.P1Left;
                this._moveRight = Core.GameManager.keyboardManager.P1Right;
                this._moveUp = Core.GameManager.keyboardManager.P1Up;
                this._moveDown = Core.GameManager.keyboardManager.P1Down;
                this._startFire = Core.GameManager.keyboardManager.P1Fire;
            }
            else if (this.name == "Player2") {
                this._moveLeft = Core.GameManager.keyboardManager.P2Left;
                this._moveRight = Core.GameManager.keyboardManager.P2Right;
                this._moveUp = Core.GameManager.keyboardManager.P2Up;
                this._moveDown = Core.GameManager.keyboardManager.P2Down;
                this._startFire = Core.GameManager.keyboardManager.P2Fire;
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
            if ((this._moveLeft) && (this._moveUp)) {
                this.x -= this._tankSpeed;
                this.y -= this._tankSpeed;
                this.rotation = -45;
            }
            else if ((this._moveLeft) && (this._moveDown)) {
                this.x -= this._tankSpeed;
                this.y += this._tankSpeed;
                this.rotation = -135;
            }
            else if ((this._moveRight) && (this._moveDown)) {
                this.x += this._tankSpeed;
                this.y += this._tankSpeed;
                this.rotation = 135;
            }
            else if ((this._moveRight) && (this._moveUp)) {
                this.x += this._tankSpeed;
                this.y -= this._tankSpeed;
                this.rotation = 45;
            }
            else if (this._moveLeft) {
                this.x -= this._tankSpeed;
                this.rotation = -90;
            }
            else if (this._moveRight) {
                this.x += this._tankSpeed;
                this.rotation = 90;
            }
            else if (this._moveUp) {
                this.y -= this._tankSpeed;
                this.rotation = 0;
            }
            else if (this._moveDown) {
                this.y += this._tankSpeed;
                this.rotation = 180;
            }
            else if (this._startFire) {
                if (this.Bullet.x == 10000) {
                    createjs.Sound.play("fire");
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
//# sourceMappingURL=tank.js.map