module scenes {
  export class OverScene extends base.Scene {
    // Private Instance Variables
    private _overLabel: base.Label;
    private _backButton: base.Button;
    private _background:Levels.Background;


    // Public Properties

    // Constructor
    constructor() {
      super();

      this.Start();
    }

    // Private Mathods
    private _backButtonClick():void {
      Core.GameManager.currentScene = config.Scene.PLAY;
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      this._overLabel = new base.Label("The Winner is: " + Core.GameManager.Level1Winner, "30px", "Consolas", "#e5e5e5", 320, 240, true);
      this._backButton = new base.Button("backButton", 320, 340);
      this._background = new Levels.Background("gameOver");
      this.Main();
    }

    public Update(): void {

    }

    // This is where the fun happens
    public Main(): void {
      this.addChild(this._background);
      this.addChild(this._overLabel);

      // add the backButton to the scene
      this.addChild(this._backButton);

      // event listeners
      this._backButton.on("click", this._backButtonClick);
    }
  }
}
