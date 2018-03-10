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
    private _obstacles :Array<base.GameObject>;
    // Public Properties

    // Constructor
    constructor() {
      super();

      this.Start();
    }

    // Private Mathods
    public CheckCollisions():void {
      let i:number = 0;
      let _collidablesCounter : number = 0;
      let _collidables = new Array<base.GameObject>();
      let _bullet1 = this.getChildByName("Bullet1") as base.Bullet;
      let _bullet2 = this.getChildByName("Bullet2") as base.Bullet;
      let _player1 = this.getChildByName("Player1") as base.GameObject;
      let _player2 = this.getChildByName("Player2") as base.GameObject;

_collidables[_collidablesCounter++] = _player2;
_collidables[_collidablesCounter++] = _player1;
while (this._obstacles[i]!=null){
  _collidables[_collidablesCounter++] = this._obstacles[i++];
}

      if (_bullet1!=null)
      {
          managers.Collision.CheckBullet(_bullet1,_collidables,"Player2");
      }
      if (_bullet2!=null)
      {
          managers.Collision.CheckBullet(_bullet2,_collidables,"Player1");
      }
      if (_player1!=null)
      {
          managers.Collision.CheckTank(_player1,_collidables,"Player2");
      }
      if (_player2!=null)
      {
         managers.Collision.CheckTank(_player2,_collidables,"Player1");
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

    this._player1.x = 40;
    this._player1.y = 240;

    this._player2.x = 600;
    this._player2.y = 240;
}

private defineObstacles():void{
  let _obstacleCounter : number = 0;
  this._obstacles = new Array<base.GameObject>();
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(130,190,"stone");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(130,240,"stone");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(130,290,"stone");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(510,190,"stone");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(510,240,"stone");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(510,290,"stone");

  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(160,80,"sea");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210,80,"sea");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(260,80,"sea");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(160,400,"sea");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210,400,"sea");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(260,400,"sea");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(480,80,"sea");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430,80,"sea");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(380,80,"sea");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(480,400,"sea");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430,400,"sea");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(380,400,"sea");


  
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(160,130,"tree");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210,130,"tree");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210,155,"tree");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(180,155,"tree");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(145,160,"tree");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(160,350,"tree");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210,350,"tree");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210,325,"tree");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(180,325,"tree");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(145,320,"tree");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(480,130,"tree");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430,130,"tree");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430,325,"tree");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(460,325,"tree");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(495,320,"tree");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430,155,"tree");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(460,155,"tree");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(495,160,"tree");


  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(260,130,"wood");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(260,350,"wood");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(380,130,"wood");
  this._obstacles[_obstacleCounter++] = new Levels.Obstacle(380,350,"wood");


}

private loadbstacles():void{
  let i:number = 0;
  while (this._obstacles[i]!=null){
    this.addChild(this._obstacles[i++]);
  }
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
this.defineObstacles();


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
      this.loadbstacles()
      this.addChild(this._player1.Bullet);
      this.addChild(this._player2.Bullet);
      Core.GameManager.playScene = this;

    }



    }
  
}
