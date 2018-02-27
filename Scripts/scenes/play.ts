module scenes {
  export class PlayScene extends base.Scene {
    // Private Instance Variables
    private _background: Levels.Background;
    public _player1: base.Tank;
    public _player2: base.Tank;
    private _p1Label: base.Label;
    private _p2Label: base.Label;
    private _timerLabel: base.Label;
    private _frameCounter:number;
    private _tankSound:createjs.AbstractSoundInstance;

    // Public Properties

    // Constructor
    constructor() {
      super();

      this.Start();
    }

    // Private Mathods
    public CheckCollisions():void {
      let _bullet1 = this.getChildByName("Bullet1") as base.Bullet;
      let _bullet2 = this.getChildByName("Bullet2") as base.Bullet;
      let _player1 = this.getChildByName("Player1") as base.GameObject;
      let _player2 = this.getChildByName("Player2") as base.GameObject;
      if (_bullet1!=null)
      {
          managers.Collision.CheckBullet(_bullet1,_player2,"Player2");
      }
      if (_bullet2!=null)
      {
          managers.Collision.CheckBullet(_bullet2,_player1,"Player1");
      }
    }


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
          this._tankSound.stop();
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
          this._tankSound.stop();
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
    this._player1 = new objects.P1Light();
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
    this._player2 = new objects.P2Light();
    break;
  }
    this._player1.name = "Player1";
    this._player2.name = "Player2";
}

    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      Core.GameManager.Timer = 90;
      this._frameCounter = 0;
      this._background = new Levels.Background("bg1");
      this._p1Label = new base.Label("Player1: " + Core.GameManager.P1Health, "16px", "Consolas", "#000000", 100, 15, true);
      this._p2Label = new base.Label("Player2: " + Core.GameManager.P2Health, "16px", "Consolas", "#000000", 600, 15, true);
      this._timerLabel = new base.Label("|" + Core.GameManager.Timer + "|", "16px", "Consolas", "#000000", 320, 15, true);
      this.setupTankTypes();
      this._tankSound = createjs.Sound.play("tankMove");
      this._tankSound.loop = -1;
      this._tankSound.volume = 0.3;


      this.Main();
    }

    public Update(): void {
      this.CheckCollisions();
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
