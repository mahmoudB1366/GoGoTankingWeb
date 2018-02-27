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
        // public properties
        // constructors
        function Tank(imageString) {
            var _this = _super.call(this, imageString) || this;
            _this.name = imageString;
            //this._initialize();
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        Tank.prototype.Start = function () {
        };
        Tank.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
            if (this._bullet != null) {
                this._bullet.Update();
                if (this._bullet.IsBulletOut()) {
                    this._bullet = null;
                }
            }
        };
        Tank.prototype.Reset = function () {
        };
        Tank.prototype.fire = function () {
        };
        Tank.prototype.setController = function () {
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
                if (this._bullet == null) {
                    createjs.Sound.play("fire");
                    this.fire();
                }
            }
        };
        return Tank;
    }(base.GameObject));
    base.Tank = Tank;
})(base || (base = {}));
//# sourceMappingURL=tank.js.map