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
    var OverScene = /** @class */ (function (_super) {
        __extends(OverScene, _super);
        // Public Properties
        // Constructor
        function OverScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        OverScene.prototype._backButtonClick = function () {
            Core.GameManager.currentScene = config.Scene.LEVEL1;
        };
        // Public Methods
        // Initialize Game Variables and objects
        OverScene.prototype.Start = function () {
            var _p1Score = 0;
            var _p2Score = 0;
            var _winner = "N/A";
            (Core.GameManager.Level1Winner == "Player1") ? ++_p1Score : ++_p2Score;
            (Core.GameManager.Level2Winner == "Player1") ? ++_p1Score : ++_p2Score;
            (Core.GameManager.Level3Winner == "Player1") ? ++_p1Score : ++_p2Score;
            _winner = (_p1Score > _p2Score) ? "Player1" : "Player2";
            this._overLabel = new base.Label("The Winner is: " + _winner, "30px", "Impact", "#e5e5e5", 320, 240, true);
            this._backButton = new base.Button("backButton", 320, 340);
            this._background = new Levels.Background("gameOver");
            this.Main();
        };
        OverScene.prototype.Update = function () {
        };
        // This is where the fun happens
        OverScene.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._overLabel);
            // add the backButton to the scene
            this.addChild(this._backButton);
            // event listeners
            this._backButton.on("click", this._backButtonClick);
        };
        return OverScene;
    }(base.Scene));
    scenes.OverScene = OverScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=over.js.map