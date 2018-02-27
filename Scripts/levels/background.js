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
    var Background = /** @class */ (function (_super) {
        __extends(Background, _super);
        // private instance variables
        // public properties
        // Constructor
        function Background(imageString) {
            var _this = _super.call(this, Core.GameManager.assetManager.getResult(imageString)) || this;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        // Initializes variables and creates new objects
        Background.prototype.Start = function () {
        };
        // updates the game object every frame
        Background.prototype.Update = function () {
        };
        return Background;
    }(createjs.Bitmap));
    Levels.Background = Background;
})(Levels || (Levels = {}));
//# sourceMappingURL=background.js.map