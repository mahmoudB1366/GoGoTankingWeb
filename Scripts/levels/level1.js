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
var Levels;
(function (Levels) {
    var Level1 = /** @class */ (function (_super) {
        __extends(Level1, _super);
        // private instance variables
        // public properties
        // Constructor
        function Level1() {
            var _this = _super.call(this, Core.GameManager.assetManager.getResult("bg1")) || this;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        // Initializes variables and creates new objects
        Level1.prototype.Start = function () {
        };
        // updates the game object every frame
        Level1.prototype.Update = function () {
        };
        return Level1;
    }(createjs.Bitmap));
    Levels.Level1 = Level1;
})(Levels || (Levels = {}));
//# sourceMappingURL=level1.js.map