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
      Core.GameManager.transferTarget = config.Scene.LEVEL1;
      Core.GameManager.currentScene = config.Scene.TRANSFER;
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      let _p1Score:number = 0;
      let _p2Score:number = 0;
      let _winner :string = "N/A";
      (Core.GameManager.Level1Winner =="Player1")? ++_p1Score : ++_p2Score;
      (Core.GameManager.Level2Winner =="Player1")? ++_p1Score : ++_p2Score;
      (Core.GameManager.Level3Winner =="Player1")? ++_p1Score : ++_p2Score;
      _winner = (_p1Score >_p2Score)? "Player1" : "Player2";
      this._overLabel = new base.Label("The Winner is: " + _winner , "30px", "Impact", "#e5e5e5", 320, 240, true);
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
