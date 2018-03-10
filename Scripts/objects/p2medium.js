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
    var P2Medium = /** @class */ (function (_super) {
        __extends(P2Medium, _super);
        // private instance variables
        // public properties
        // Constructor
        function P2Medium() {
            return _super.call(this, "p2medium", "Player2", config.tankTypes.MEDIUM) || this;
        }
        return P2Medium;
    }(base.Tank));
    objects.P2Medium = P2Medium;
})(objects || (objects = {}));
//# sourceMappingURL=p2medium.js.map