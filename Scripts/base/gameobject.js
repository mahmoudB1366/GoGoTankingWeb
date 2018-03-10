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
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        // constructors
        function GameObject(imageString) {
            var _this = _super.call(this, Core.GameManager.assetManager.getResult(imageString)) || this;
            _this._initialize();
            return _this;
        }
        // private methods
        GameObject.prototype._initialize = function () {
            this.Width = this.getBounds().width;
            this.Height = this.getBounds().height;
            this.HalfWidth = this.Width * 0.5;
            this.HalfHeight = this.Height * 0.5;
            this.regX = this.HalfWidth;
            this.regY = this.HalfHeight;
            this.IsColliding = false;
            this.Life = 10; // Different from tank's health value
        };
        return GameObject;
    }(createjs.Bitmap));
    base.GameObject = GameObject;
})(base || (base = {}));
//# sourceMappingURL=gameobject.js.map