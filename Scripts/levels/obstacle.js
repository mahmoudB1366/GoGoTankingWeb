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
    var Obstacle = /** @class */ (function (_super) {
        __extends(Obstacle, _super);
        // private instance variables
        // public properties
        // Constructor
        function Obstacle(x, y, name) {
            var _this = _super.call(this, name) || this;
            _this.x = x;
            _this.y = y;
            _this.name = name;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        // Initializes variables and creates new objects
        Obstacle.prototype.Start = function () {
        };
        // updates the game object every frame
        Obstacle.prototype.Update = function () {
        };
        return Obstacle;
    }(base.GameObject));
    Levels.Obstacle = Obstacle;
})(Levels || (Levels = {}));
//# sourceMappingURL=obstacle.js.map