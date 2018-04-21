module scenes {
    export class TransferScene extends base.Scene {
        // Private Instance Variables
        private _background: Levels.Background;
        private _loadingBar: base.Label;
        private _frameCounter: number;
        // Public Properties

        // Constructor
        constructor() {
            super();

            this.Start();
        }

        // Private Mathods



        // Public Methods

        // Initialize Game Variables and objects
        public Start(): void {

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
        }

        public Update(): void {
            this._frameCounter += 1;
            if (this._frameCounter >= 2) {
                if (this._background.alpha < 1) {
                    this._background.alpha+=0.1;
                }
                else {
                    let taget = Core.GameManager.transferTarget;
                    Core.GameManager.currentScene = taget;
                }
                this._frameCounter = 0;
            }

        }

        // This is where the fun happens
        public Main(): void {
            this.addChild(this._background);
            this.addChild(this._loadingBar);

        }
    }
}
