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
    var PopUp = /** @class */ (function (_super) {
        __extends(PopUp, _super);
        // Constructor
        function PopUp(x, y, name) {
            var _this = _super.call(this, name) || this;
            _this.x = x;
            _this.y = y;
            _this.name = name;
            _this.Start();
            _this.Display = false;
            return _this;
        }
        // private methods
        // public methods
        // Initializes variables and creates new objects
        PopUp.prototype.Start = function () {
        };
        // updates the game object every frame
        PopUp.prototype.Update = function () {
        };
        return PopUp;
    }(base.GameObject));
    Levels.PopUp = PopUp;
})(Levels || (Levels = {}));
//# sourceMappingURL=popup.js.map