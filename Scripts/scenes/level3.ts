module scenes {
    export class Level3Scene extends base.Scene {
      // Private Instance Variables
      private _background: Levels.Background;
      public _player1: base.Tank;
      public _player2: base.Tank;
      private _p1Label: base.Label;
      private _p2Label: base.Label;
      private _timerLabel: base.Label;
      private _frameCounter:number;
      private _popUpCounter:number;
      private _tankSound:createjs.AbstractSoundInstance;
      private _obstacles :Array<base.GameObject>;  
      private _star:Levels.PopUp;
      private _health:Levels.PopUp;
      private _mine:Levels.PopUp;
      private _range:Levels.PopUp;
      private _labelBg : createjs.Bitmap;
  
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
  _collidables[_collidablesCounter++] = this._star;
  _collidables[_collidablesCounter++] = this._health;
  _collidables[_collidablesCounter++] = this._mine;
  _collidables[_collidablesCounter++] = this._range;
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
        _collidables = null;
      }
  
      private displayPopup():void{
        let _timer :number = Core.GameManager.Timer;
        if ( _timer>0)
        {
  
          if (_timer%20 ==0 )
          {
            this._health.x = this.generateRandomNumber("x");
            this._health.y = this.generateRandomNumber("y");
  
            this._star.x = this.generateRandomNumber("x");
            this._star.y = this.generateRandomNumber("y");
  
            this._range.x = this.generateRandomNumber("x");
            this._range.y = this.generateRandomNumber("y");
          
          }
          if (_timer%30 ==0 )
          {
            this._mine.x = this.generateRandomNumber("x");
            this._mine.y = this.generateRandomNumber("y");
          }
        }
  
        }
      private generateRandomNumber(corodinates:string):number{
  switch(corodinates)
  {
    case "x":
    return Math.floor(Math.random() * 610) + 15  ;
  case "y":
  return Math.floor(Math.random() * 450) + 15  ;
  
  }
      }
  
  private updateLables():void{
    this._frameCounter +=1;
    if (this._frameCounter >=60)
    {
      
      if (Core.GameManager.Timer >0)
      {
        this.displayPopup();
        Core.GameManager.Timer-=1;
        
      }
      this._frameCounter =0;
    }
    
    this._p1Label.text = "P1: " + Core.GameManager.P1Health;
    this._p2Label.text = "P2: " + Core.GameManager.P2Health;
    
    if (Core.GameManager.Timer < 30)
    {
      this._timerLabel.text = ".:Last Shot:."
    } else
    {
      this._timerLabel.text = "|" + Core.GameManager.Timer + "|";
    }
  }

  private checkLives(): void {
    if (this._player1 != null) {
      this._player1.Update();
      if (Core.GameManager.P1Health <= 0 && !this._player1.onExplosion) {
        this._player1.gotoAndPlay("explosion");
        this._player1.onExplosion = true;
       // this._player1.Life = 999;
      }
      if (this._player1.onExplosion && this._player1.paused)
      {
        this.removeChild(this._player1);
        Core.GameManager.Level3Winner = "Player2";
        this._tankSound.stop();
        Core.GameManager.transferTarget = config.Scene.OVER;
        Core.GameManager.currentScene = config.Scene.TRANSFER;
        this._player1 = null;
      }
    }
    if (this._player2 != null) {
      this._player2.Update();
      if (Core.GameManager.P2Health <= 0 && !this._player2.onExplosion) {
        this._player2.gotoAndPlay("explosion");
        this._player2.onExplosion = true;
      }
      if (this._player2.onExplosion && this._player2.paused)
      {
        this.removeChild(this._player2);
        Core.GameManager.Level3Winner = "Player1";
        this._tankSound.stop();
        Core.GameManager.transferTarget = config.Scene.OVER;
        Core.GameManager.currentScene = config.Scene.TRANSFER;
        this._player2 = null;
      }

    }
    if (this._obstacles != null)
      if (this._obstacles.length > 0) {
        for (let i: number = 0; i < this._obstacles.length; ++i) {
          if (this._obstacles[i].Life < 1 && !this._obstacles[i].onExplosion) {
            this._obstacles[i].gotoAndPlay("explosion");
            this._obstacles[i].onExplosion = true;
          }
          if (this._obstacles[i].onExplosion && this._obstacles[i].paused)
            {
              this.removeChild(this._obstacles[i]);
              this._obstacles[i].x = 12000;
            }
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
      Core.GameManager.P1Tank = this._player1;
      Core.GameManager.P2Tank = this._player2;
      this._player1.x = 40;
      this._player1.y = 240;
  
      this._player2.x = 600;
      this._player2.y = 240;
  }
  
  private defineObstacles():void{
    let _obstacleCounter : number = 0;
    this._obstacles = new Array<base.GameObject>();
 
    // Rock - stony field in the corners
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25,105,"stone");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615,375,"stone");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(145,105,"stone");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(495,375,"stone");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(265,25,"stone");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(375,455,"stone");
    
    // Wood - central diamond
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(215,265,"wood");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(425,215,"wood");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(265,145,"wood");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(375,335,"wood");
    
    // Houses - vertical
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(95,215,"house");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(545,265,"house");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(95,265,"house");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(545,215,"house");

    // Houses - horizontal
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(215,385,"house");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(425,95,"house");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(265,385,"house");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(375,95,"house");

    // Grass - vertical area, bottom left corner
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25,315,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25,355,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25,395,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(65,315,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(65,355,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(65,395,"grass");
    // fill gaps
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(45,335,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(45,375,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(85,335,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(85,375,"grass");

    // Grass - horizontal area, bottom left corner
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(85,415,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(125,415,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(165,415,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(85,455,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(125,455,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(165,455,"grass");
    // fill gaps
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(105,435,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(145,435,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(105,395,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(145,395,"grass");

    // Grass - connecting triangle, bottom left corner
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(105,315,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(105,345,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(105,375,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(135,375,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(165,375,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(135,345,"grass");

    // Grass - vertical area, top right corner
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615,165,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615,125,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615,85,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(575,165,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(575,125,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(575,85,"grass");
    // fill gaps
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(595,145,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(595,105,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(555,145,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(555,105,"grass");

    // Grass - horizontal area, top right corner
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(555,65,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(515,65,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(475,65,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(555,25,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(515,25,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(475,25,"grass");
    // fill gaps
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(535,45,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(495,45,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(535,85,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(495,85,"grass");

    // Grass - connecting triangle, top right corner
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(535,165,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(535,135,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(535,105,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(505,105,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(475,105,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(505,135,"grass");

    // Grass - top stony field
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(195,75,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(230,75,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(260,75,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(295,75,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(325,75,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(195,95,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(230,95,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(260,95,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(295,95,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(325,95,"grass");

    // Grass - bottom stony field
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(445,405,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(410,405,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(380,405,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(345,405,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(315,405,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(445,385,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(410,385,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(380,385,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(345,385,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(315,385,"grass");
  
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
        this._background = new Levels.Background("bg3");
        this._p1Label = new base.Label("P1: " + Core.GameManager.P1Health, "20px", "Impact", "#843415", 20, 15, false);
        this._p2Label = new base.Label("P2: " + Core.GameManager.P2Health, "20px", "Impact", "#0C491D", 565, 15, false);
        this._timerLabel = new base.Label("|" + Core.GameManager.Timer + "|", "22px", "Impact", "#454950", 320, 15, true);
        this._labelBg = new createjs.Bitmap(Core.GameManager.assetManager.getResult("labelBg"));
        this._labelBg.alpha = 0.5;
        
        this.setupTankTypes();
        this._tankSound = createjs.Sound.play("level3sd");
        this._tankSound.loop = -1;
        this._tankSound.volume = 0.2;

        this._mine = new Levels.PopUp(5000,5000,"mine");
        this._star = new Levels.PopUp(5000,5000,"star");
        this._range = new Levels.PopUp(5000,5000,"range");
        this._health = new Levels.PopUp(5000,5000,"health");
  this.defineObstacles();
  
  
        this.Main();
      }
  
      public Update(): void {
        this.CheckCollisions();
        this.updateLables();
        this._background.Update();
        this.checkLives()
        this._player1 = Core.GameManager.P1Tank;
        this._player2 = Core.GameManager.P2Tank;
      }
  
      // This is where the fun happens
      public Main(): void {
        // add the background to the scene
        this.addChild(this._background);
  
        // add the Players to the scene
        this.addChild(this._player1);
        this.addChild(this._player2);
        this.loadbstacles();
  
        this.addChild(this._star);
        this.addChild(this._mine);
        this.addChild(this._health);
        this.addChild(this._range);
  
        this.addChild(this._player1.Bullet);
        this.addChild(this._player2.Bullet);

        this.addChild(this._labelBg);
        this.addChild(this._p1Label);
        this.addChild(this._p2Label);
        this.addChild(this._timerLabel);
        Core.GameManager.playScene = this;
  
      }
  
  
  
      }
    
  }
  