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
var objects;
(function (objects) {
    var P1Light = /** @class */ (function (_super) {
        __extends(P1Light, _super);
        // private instance variables
        // public properties
        // Constructor
        function P1Light() {
            var _this = _super.call(this, "p1light") || this;
            _this.setTankProperties();
            _this.setController();
            _this.Start();
            return _this;
        }
        // private methods
        //set Tank Properties
        P1Light.prototype.setTankProperties = function () {
            this._tankSpeed = Core.GameManager.L_tank_speed;
            this._bulletSpeed = Core.GameManager.L_bullet_speed;
            this._bulletRange = Core.GameManager.L_bullet_range;
            this._bulletPower = Core.GameManager.L_bullet_power;
            this._tankLife = 100;
            Core.GameManager.P1Health = 100;
        };
        //set Controllers
        P1Light.prototype.setController = function () {
            this._moveLeft = Core.GameManager.keyboardManager.P1Left;
            this._moveRight = Core.GameManager.keyboardManager.P1Right;
            this._moveUp = Core.GameManager.keyboardManager.P1Up;
            this._moveDown = Core.GameManager.keyboardManager.P1Down;
            this._startFire = Core.GameManager.keyboardManager.P1Fire;
        };
        // public methods
        // Initializes variables and creates new objects
        P1Light.prototype.Start = function () {
            this.y = 430;
            this.x = 200;
        };
        // updates the game object every frame
        P1Light.prototype.Update = function () {
            _super.prototype.Update.call(this);
        };
        P1Light.prototype.fire = function () {
            this._bullet = new objects.Bullet1(this.x, this.y, this.rotation, this._bulletSpeed, this._bulletRange, this._bulletPower);
            this.parent.addChild(this._bullet);
        };
        return P1Light;
    }(base.Tank));
    objects.P1Light = P1Light;
})(objects || (objects = {}));
//# sourceMappingURL=p1light.js.map