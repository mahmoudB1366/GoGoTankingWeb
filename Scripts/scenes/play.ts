module scenes {
  export class PlayScene extends base.Scene {
    // Private Instance Variables
    private _background: Levels.Level1;
    public _player1: base.Tank;
    public _player2: base.Tank;
    private _p1Label: base.Label;
    private _p2Label: base.Label;
    private _timerLabel: base.Label;
    private _frameCounter:number;
    //private _island: objects.Island;
    //private _clouds: objects.Cloud[];
   // private _cloudNum: number;

    // Public Properties

    // Constructor
    constructor() {
      super();

      this.Start();
    }

    // Private Mathods
private updateLables():void{
  this._frameCounter +=1;
  if (this._frameCounter >=60)
  {
    
    if (Core.GameManager.Timer >0)
    {
      Core.GameManager.Timer-=1;
    }
    this._frameCounter =0;
  }
  
  this._p1Label.text = "Player1: " + Core.GameManager.P1Health;
  this._p2Label.text = "Player2: " + Core.GameManager.P2Health;
  this._timerLabel.text = "|" + Core.GameManager.Timer + "|";
}
private checkLives():void{
  if (this._player1 !=null)
      {
        this._player1.Update();
        if (Core.GameManager.P1Health <= 0)
        {
          this.removeChild(this._player1);
          this._player1 = null;
          Core.GameManager.Level1Winner = "Player2";
          Core.GameManager.currentScene = config.Scene.OVER;

        }
      }
      
      
      if (this._player2 !=null)
      {
        this._player2.Update();
        if (Core.GameManager.P2Health <= 0)
        {
          this.removeChild(this._player2);
          this._player2 = null;
          Core.GameManager.Level1Winner = "Player1";
          Core.GameManager.currentScene = config.Scene.OVER;
        }
      }
}

private setupTankTypes():void{
  switch(Core.GameManager.Player1TankType) {
    case config.tankTypes.HEAVY:
    this._player1 = new objects.P1Heavy();
    break;
    case config.tankTypes.MEDIUM:
    this._player1 = new objects.P1Medium();
    break;
    case config.tankTypes.LIGHT:
    this._player1 = new objects.P1Medium();
    break;
  }
  switch(Core.GameManager.Player2TankType) {
    case config.tankTypes.HEAVY:
    this._player2 = new objects.P2Heavy();
    break;
    case config.tankTypes.MEDIUM:
    this._player2 = new objects.P2Medium();
    break;
    case config.tankTypes.LIGHT:
    this._player2 = new objects.P2Medium();
    break;
  }

}

    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      Core.GameManager.Timer = 90;
      this._frameCounter = 0;
      this._background = new Levels.Level1();
      this._p1Label = new base.Label("Player1: " + Core.GameManager.P1Health, "16px", "Consolas", "#000000", 100, 15, true);
      this._p2Label = new base.Label("Player2: " + Core.GameManager.P2Health, "16px", "Consolas", "#000000", 600, 15, true);
      this._timerLabel = new base.Label("|" + Core.GameManager.Timer + "|", "16px", "Consolas", "#000000", 320, 15, true);
      this.setupTankTypes();
      


      this.Main();
    }

    public Update(): void {
      this.updateLables();
      this._background.Update();
      this.checkLives()
    }

    // This is where the fun happens
    public Main(): void {
      // add the background to the scene
      this.addChild(this._background);

      // add the Players to the scene
      this.addChild(this._player1);
      this.addChild(this._player2);
      this.addChild(this._p1Label);
      this.addChild(this._p2Label);
      this.addChild(this._timerLabel);
      Core.GameManager.playScene = this;

    }



    }
  
}
