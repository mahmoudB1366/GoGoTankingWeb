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
var scenes;
(function (scenes) {
    var TransferScene = /** @class */ (function (_super) {
        __extends(TransferScene, _super);
        // Public Properties
        // Constructor
        function TransferScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        // Public Methods
        // Initialize Game Variables and objects
        TransferScene.prototype.Start = function () {
            switch (Core.GameManager.transferTarget) {
                case config.Scene.LOAD:
                    this._background = new Levels.Background("loading");
                    break;
                case config.Scene.LEVEL1:
                    this._background = new Levels.Background("bg1");
                    break;
                case config.Scene.LEVEL2:
                    this._background = new Levels.Background("bg2");
                    break;
                case config.Scene.LEVEL3:
                    this._background = new Levels.Background("bg3");
                    break;
                case config.Scene.OVER:
                    this._background = new Levels.Background("gameOver");
                    break;
            }
            this._background.alpha = 0;
            this._frameCounter = 0;
            this.Main();
        };
        TransferScene.prototype.Update = function () {
            this._frameCounter += 1;
            if (this._frameCounter >= 2) {
                if (this._background.alpha < 1) {
                    this._background.alpha += 0.1;
                }
                else {
                    var taget = Core.GameManager.transferTarget;
                    Core.GameManager.currentScene = taget;
                }
                this._frameCounter = 0;
            }
        };
        // This is where the fun happens
        TransferScene.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._loadingBar);
        };
        return TransferScene;
    }(base.Scene));
    scenes.TransferScene = TransferScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=transfer.js.map