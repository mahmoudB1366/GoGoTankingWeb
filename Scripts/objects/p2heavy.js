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
    var P2Heavy = /** @class */ (function (_super) {
        __extends(P2Heavy, _super);
        // private instance variables
        // public properties
        // Constructor
        function P2Heavy() {
            return _super.call(this, "p2heavy", "Player2", config.tankTypes.HEAVY) || this;
        }
        return P2Heavy;
    }(base.Tank));
    objects.P2Heavy = P2Heavy;
})(objects || (objects = {}));
//# sourceMappingURL=p2heavy.js.map