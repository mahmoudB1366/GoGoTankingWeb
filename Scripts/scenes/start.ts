module scenes {
  export class StartScene extends base.Scene {
    // Private Instance Variables
    private _player1: base.Label;
    private _player2: base.Label;

    private _p1Heavy: base.Button;
    private _p1Medium: base.Button;
    private _p1Light: base.Button;
    private _p2Heavy: base.Button;
    private _p2Medium: base.Button;
    private _p2Light: base.Button;

    private _selectionShadow: base.Button;

    private _startButton: base.Button;

    // Public Properties

    // Constructor
    constructor() {
      super();

      this.Start();
    }

    // Private Mathods
    private _startButtonClick():void {
      if ((Core.GameManager.Player1TankType !=null)&&(Core.GameManager.Player1TankType !=null))
      {
        Core.GameManager.currentScene = config.Scene.PLAY;
      }
      else
      {
        alert("Both Players need to select tank types!!!")
      }
      
    }
    private _setPlayerSelection(eventObject:MouseEvent):void {
      switch(eventObject.target.name) {
        case "p1heavy":
        Core.GameManager.Player1TankType = config.tankTypes.HEAVY; //GOOD
//(this.getChildAt(0) as base.Button).setCoordination(100,200);
        break;
        case "p1medium":
          Core.GameManager.Player1TankType = config.tankTypes.MEDIUM;
        break;
        case "p1light":
          Core.GameManager.Player1TankType = config.tankTypes.LIGHT;
        break;
        case "p2heavy":
        Core.GameManager.Player2TankType = config.tankTypes.HEAVY;
      break;
      case "p2medium":
        Core.GameManager.Player2TankType = config.tankTypes.MEDIUM;
      break;
      case "p2light":
        Core.GameManager.Player2TankType = config.tankTypes.LIGHT;
      break;
      }
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      Core.GameManager.Player1TankType = null;
      Core.GameManager.Player2TankType = null;
     // this._selectionShadow = new base.Button("selection", 100, 100);

      this._player1 = new base.Label("Player1:", "24px", "Consolas", "#000000", 100, 50, true);
      this._p1Heavy = new base.Button("p1heavy", 200, 100);
      this._p1Medium = new base.Button("p1medium", 300, 100);
      this._p1Light = new base.Button("p1light", 400, 100);

      this._player2 = new base.Label("Player2:", "24px", "Consolas", "#000000", 100, 200, true);
      this._p2Heavy = new base.Button("p2heavy", 200, 250);
      this._p2Medium = new base.Button("p2medium", 300, 250);
      this._p2Light = new base.Button("p2light", 400, 250);

      this._p1Heavy.name = "p1heavy";
      this._p1Medium.name = "p1medium";
      this._p1Light.name = "p1light";

      this._p2Heavy.name = "p2heavy";
      this._p2Medium.name = "p2medium";
      this._p2Light.name = "p2light";


      this._startButton = new base.Button("startButton", 300, 400);

      this.Main();
    }

    public Update(): void {

    }

    // This is where the fun happens
    public Main(): void {
      // add the welcome label to the scene
     // this.addChild(this._selectionShadow);
      this.addChild(this._player1);
      this.addChild(this._player2);
      //this.addChild(this._selectionShadow);

      this.addChild(this._p1Heavy);
      this.addChild(this._p1Medium);
      this.addChild(this._p1Light);

      this.addChild(this._p2Heavy);
      this.addChild(this._p2Medium);
      this.addChild(this._p2Light);

      // add the startButton to the scene
      this.addChild(this._startButton);

      this._p1Heavy.on("click",this._setPlayerSelection);
      this._p1Medium.on("click", this._setPlayerSelection);
      this._p1Light.on("click", this._setPlayerSelection);

      this._p2Heavy.on("click", this._setPlayerSelection);
      this._p2Medium.on("click", this._setPlayerSelection);
      this._p2Light.on("click", this._setPlayerSelection);

      this._startButton.on("click", this._startButtonClick);
    }
  }
}
