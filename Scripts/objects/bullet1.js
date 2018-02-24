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
    var Bullet1 = /** @class */ (function (_super) {
        __extends(Bullet1, _super);
        // private instance variables
        // public properties
        // Constructor
        function Bullet1(x, y, angel, speed, range, power) {
            var _this = _super.call(this, x, y, angel, speed, range, power) || this;
            _this._enemy = "Player2";
            _this._enemyTank = Core.GameManager.playScene.getChildAt(2);
            return _this;
        }
        Bullet1.prototype.IsColliding = function () {
            if (this._enemyTank != null) {
                if ((Math.abs(this.y - this._enemyTank.y) < (this.HalfHeight + this._enemyTank.HalfHeight))
                    && (Math.abs(this.x - this._enemyTank.x) < (this.HalfWidth + this._enemyTank.HalfWidth))) {
                    Core.GameManager.P2Health -= this._power;
                    this.x = 10000;
                }
                return "";
            }
        };
        return Bullet1;
    }(base.Bullet));
    objects.Bullet1 = Bullet1;
})(objects || (objects = {}));
//# sourceMappingURL=bullet1.js.map