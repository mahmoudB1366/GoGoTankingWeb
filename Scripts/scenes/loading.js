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
    var LoadScene = /** @class */ (function (_super) {
        __extends(LoadScene, _super);
        // Public Properties
        // Constructor
        function LoadScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        // Public Methods
        // Initialize Game Variables and objects
        LoadScene.prototype.Start = function () {
            // this._selectionShadow = new base.Button("selection", 100, 100);
            this._background = new Levels.Background("loading");
            this._loadingBar = new base.Label("", "20px", "Impact", "#843415", 30, 420, false);
            this._frameCounter = 0;
            this.Main();
        };
        LoadScene.prototype.Update = function () {
            this._frameCounter += 1;
            if (this._frameCounter >= 3) {
                if (this._loadingBar.text.length < 107) {
                    this._loadingBar.text += "|";
                }
                else {
                    Core.GameManager.transferTarget = config.Scene.LEVEL1;
                    Core.GameManager.currentScene = config.Scene.TRANSFER;
                }
                this._frameCounter = 0;
            }
        };
        // This is where the fun happens
        LoadScene.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._loadingBar);
        };
        return LoadScene;
    }(base.Scene));
    scenes.LoadScene = LoadScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=loading.js.map