var managers;
(function (managers) {
    var KeyboardManager = /** @class */ (function () {
        // Constructors
        function KeyboardManager() {
            this.enabled = false;
            this.P1Left = false;
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        }
        // private methods
        // public methods
        KeyboardManager.prototype.onKeyDown = function (event) {
            console.log(event.key);
            switch (event.key) {
                case config.Controllers.P1_UP:
                    this.P1Up = true;
                    break;
                case config.Controllers.P1_LEFT:
                    this.P1Left = true;
                    break;
                case config.Controllers.P1_DOWN:
                    this.P1Down = true;
                    break;
                case config.Controllers.P1_RIGHT:
                    this.P1Right = true;
                    break;
                case config.Controllers.P1_FIRE:
                    this.P1Fire = true;
                    break;
                case config.Controllers.P2_UP:
                    this.P2Up = true;
                    break;
                case config.Controllers.P2_LEFT:
                    this.P2Left = true;
                    break;
                case config.Controllers.P2_DOWN:
                    this.P2Down = true;
                    break;
                case config.Controllers.P2_RIGHT:
                    this.P2Right = true;
                    break;
                case config.Controllers.P2_FIRE:
                    this.P2Fire = true;
                    break;
            }
        };
        KeyboardManager.prototype.onKeyUp = function (event) {
            switch (event.key) {
                case config.Controllers.P1_UP:
                    this.P1Up = false;
                    break;
                case config.Controllers.P1_LEFT:
                    this.P1Left = false;
                    break;
                case config.Controllers.P1_DOWN:
                    this.P1Down = false;
                    break;
                case config.Controllers.P1_RIGHT:
                    this.P1Right = false;
                    break;
                case config.Controllers.P1_FIRE:
                    this.P1Fire = false;
                    break;
                case config.Controllers.P2_UP:
                    this.P2Up = false;
                    break;
                case config.Controllers.P2_LEFT:
                    this.P2Left = false;
                    break;
                case config.Controllers.P2_DOWN:
                    this.P2Down = false;
                    break;
                case config.Controllers.P2_RIGHT:
                    this.P2Right = false;
                    break;
                case config.Controllers.P2_FIRE:
                    this.P2Fire = false;
                    break;
            }
        };
        return KeyboardManager;
    }());
    managers.KeyboardManager = KeyboardManager;
})(managers || (managers = {}));
//# sourceMappingURL=keyboardManager.js.map