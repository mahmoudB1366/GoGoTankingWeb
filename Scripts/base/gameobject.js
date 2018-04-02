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
//# sourceMappingURL=gameobject.js.map