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
    var P1Light = /** @class */ (function (_super) {
        __extends(P1Light, _super);
        // private instance variables
        // public properties
        // Constructor
        function P1Light() {
            return _super.call(this, "p1light", "Player1", config.tankTypes.LIGHT) || this;
        }
        return P1Light;
    }(base.Tank));
    objects.P1Light = P1Light;
})(objects || (objects = {}));
//# sourceMappingURL=p1light.js.map