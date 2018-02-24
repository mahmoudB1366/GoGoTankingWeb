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
    var P1Heavy = /** @class */ (function (_super) {
        __extends(P1Heavy, _super);
        // private instance variables
        // public properties
        // Constructor
        function P1Heavy() {
            var _this = _super.call(this, "p1heavy") || this;
            _this.setTankProperties();
            _this.setController();
            _this.Start();
            return _this;
        }
        // private methods
        //set Tank Properties
        P1Heavy.prototype.setTankProperties = function () {
            this._tankSpeed = Core.GameManager.H_tank_speed;
            this._bulletSpeed = Core.GameManager.H_bullet_speed;
            this._bulletRange = Core.GameManager.H_bullet_range;
            this._bulletPower = Core.GameManager.H_bullet_power;
            this._tankLife = 100;
            Core.GameManager.P1Health = 100;
        };
        //set Controllers
        P1Heavy.prototype.setController = function () {
            this._left = Core.GameManager.P1_LEFT;
            this._right = Core.GameManager.P1_RIGHT;
            this._up = Core.GameManager.P1_UP;
            this._down = Core.GameManager.P1_DOWN;
            this._fire = Core.GameManager.P1_FIRE;
        };
        // public methods
        // Initializes variables and creates new objects
        P1Heavy.prototype.Start = function () {
            this.y = 430;
            this.x = 200;
        };
        // updates the game object every frame
        P1Heavy.prototype.Update = function () {
            _super.prototype.Update.call(this);
        };
        P1Heavy.prototype.fire = function () {
            this._bullet = new objects.Bullet1(this.x, this.y, this.rotation, this._bulletSpeed, this._bulletRange, this._bulletPower);
            this.parent.addChild(this._bullet);
        };
        return P1Heavy;
    }(base.Tank));
    objects.P1Heavy = P1Heavy;
})(objects || (objects = {}));
//# sourceMappingURL=p1heavy.js.map