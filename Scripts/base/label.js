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
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        // Public Propoerties
        // Constructor
        function Label(labelString, fontSize, fontFamily, fontColour, x, y, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, "PLACEHOLDER", fontSize + " " + fontFamily, fontColour) || this;
            _this._isCentered = isCentered;
            _this._locationX = x;
            _this._locationY = y;
            _this.SetText(labelString);
            return _this;
            //this.x = x;
            //this.y = y;
        }
        // Private Methods
        // Public Methods
        Label.prototype.SetText = function (text) {
            this.text = text;
            //this.textAlign = "center";
            if (this._isCentered) {
                this.regX = this.getMeasuredWidth() * 0.5;
                this.regY = this.getMeasuredHeight() * 0.5;
            }
            this.x = this._locationX;
            this.y = this._locationY;
        };
        return Label;
    }(createjs.Text));
    base.Label = Label;
})(base || (base = {}));
//# sourceMappingURL=label.js.map