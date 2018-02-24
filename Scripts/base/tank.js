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
        function Tank(imageString) {
            var _this = _super.call(this, Core.GameManager.assetManager.getResult(imageString)) || this;
            _this.name = imageString;
            _this._initialize();
            return _this;
        }
        // private methods
        Tank.prototype._initialize = function () {
            this.Width = this.getBounds().width;
            this.Height = this.getBounds().height;
            this.HalfWidth = this.Width * 0.5;
            this.HalfHeight = this.Height * 0.5;
            this.regX = this.HalfWidth;
            this.regY = this.HalfHeight;
            this.Start();
        };
        // public methods
        Tank.prototype.Start = function () {
        };
        Tank.prototype.Update = function () {
            this._keyboardEvent = Core.GameManager.KeyboardEvent;
            this.Move();
            this.CheckBounds();
            if (this._bullet != null) {
                this._bullet.Update();
                if (this._bullet.IsOut()) {
                    this._bullet = null;
                }
            }
        };
        Tank.prototype.Reset = function () {
        };
        Tank.prototype.fire = function () {
        };
        Tank.prototype.CheckBounds = function () {
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
        Tank.prototype.Move = function () {
            if (this._keyboardEvent != null) {
                switch (this._keyboardEvent.key) {
                    case this._left:
                        this.x -= this._tankSpeed;
                        this.rotation = -90;
                        Core.GameManager.KeyboardEvent = null;
                        break;
                    case this._right:
                        this.x += this._tankSpeed;
                        this.rotation = +90;
                        Core.GameManager.KeyboardEvent = null;
                        break;
                    case this._down:
                        this.y += this._tankSpeed;
                        this.rotation = 180;
                        Core.GameManager.KeyboardEvent = null;
                        break;
                    case this._up:
                        this.y -= this._tankSpeed;
                        this.rotation = 0;
                        Core.GameManager.KeyboardEvent = null;
                        break;
                    case this._fire:
                        if (this._bullet == null) {
                            this.fire();
                        }
                        Core.GameManager.KeyboardEvent = null;
                        break;
                }
            }
        };
        return Tank;
    }(createjs.Bitmap));
    base.Tank = Tank;
})(base || (base = {}));
//# sourceMappingURL=tank.js.map