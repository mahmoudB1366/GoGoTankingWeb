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
    var P1Heavy = /** @class */ (function (_super) {
        __extends(P1Heavy, _super);
        // private instance variables
        // public properties
        // Constructor
        function P1Heavy() {
            return _super.call(this, "p1heavy", "Player1", config.tankTypes.HEAVY) || this;
        }
        return P1Heavy;
    }(base.Tank));
    objects.P1Heavy = P1Heavy;
})(objects || (objects = {}));
//# sourceMappingURL=p1heavy.js.map