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
    var P2Medium = /** @class */ (function (_super) {
        __extends(P2Medium, _super);
        // private instance variables
        // public properties
        // Constructor
        function P2Medium() {
            var _this = _super.call(this, "p2medium") || this;
            _this.setTankProperties();
            _this.setController();
            _this.Start();
            return _this;
        }
        // private methods
        //set Tank Properties
        P2Medium.prototype.setTankProperties = function () {
            this._tankSpeed = Core.GameManager.M_tank_speed;
            this._bulletSpeed = Core.GameManager.M_bullet_speed;
            this._bulletRange = Core.GameManager.M_bullet_range;
            this._bulletPower = Core.GameManager.M_bullet_power;
            this._tankLife = 100;
            Core.GameManager.P2Health = 100;
        };
        //set Controllers
        P2Medium.prototype.setController = function () {
            this._left = Core.GameManager.P2_LEFT;
            this._right = Core.GameManager.P2_RIGHT;
            this._up = Core.GameManager.P2_UP;
            this._down = Core.GameManager.P2_DOWN;
            this._fire = Core.GameManager.P2_FIRE;
        };
        // public methods
        // Initializes variables and creates new objects
        P2Medium.prototype.Start = function () {
            this.y = 130;
            this.x = 200;
        };
        // updates the game object every frame
        P2Medium.prototype.Update = function () {
            _super.prototype.Update.call(this);
        };
        P2Medium.prototype.fire = function () {
            this._bullet = new objects.Bullet2(this.x, this.y, this.rotation, this._bulletSpeed, this._bulletRange, this._bulletPower);
            this.parent.addChild(this._bullet);
        };
        return P2Medium;
    }(base.Tank));
    objects.P2Medium = P2Medium;
})(objects || (objects = {}));
//# sourceMappingURL=p2medium.js.map