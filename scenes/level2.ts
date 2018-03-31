module scenes {
    export class Level2Scene extends base.Scene {
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
    
    this._p1Label.text = "Player1: " + Core.GameManager.P1Health;
    this._p2Label.text = "Player2: " + Core.GameManager.P2Health;
    
    if (Core.GameManager.Timer < 30)
    {
      this._timerLabel.text = ".:Last Shot:."
    } else
    {
      this._timerLabel.text = "|" + Core.GameManager.Timer + "|";
    }
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
            Core.GameManager.currentScene = config.Scene.LEVEL3;
            
  
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
            Core.GameManager.currentScene = config.Scene.LEVEL3;
            
          }
        }
        if (this._obstacles !=null)
        if (this._obstacles.length > 0 )
        {
  for (let i:number =0;i< this._obstacles.length; ++i)
  {
    if(this._obstacles[i].Life < 1)
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
      this._player1.y = 340;
  
      this._player2.x = 600;
      this._player2.y = 340;
  }
  
  private defineObstacles():void{
    let _obstacleCounter : number = 0;
    this._obstacles = new Array<base.GameObject>();
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(90,390,"stone");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(550,90,"stone");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(90,90,"stone");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(550,390,"stone");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(155,210,"stone");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(485,430,"stone");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(300,25,"stone");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(340,455,"stone");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(350,25,"stone");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(290,455,"stone");


    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210,330,"wood");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(270,310,"wood");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(315,395,"wood");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(325,85,"wood");
    
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25,265,"house");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615,215,"house");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(75,265,"house");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(565,265,"house");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(190,265,"house");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(450,215,"house");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(240,265,"house");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(400,215,"house");

    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25,215,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615,265,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(65,215,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(575,265,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(25,175,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(615,305,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(65,175,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(575,305,"grass");
    
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(250,25,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(390,455,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210,25,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430,455,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(250,65,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(390,415,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(210,65,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(430,415,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(275,75,"grass");
    this._obstacles[_obstacleCounter++] = new Levels.Obstacle(365,405,"grass");
  
  
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
        this._background = new Levels.Background("bg2");
        this._p1Label = new base.Label("Player1: " + Core.GameManager.P1Health, "16px", "Consolas", "#000000", 100, 15, true);
        this._p2Label = new base.Label("Player2: " + Core.GameManager.P2Health, "16px", "Consolas", "#000000", 600, 15, true);
        this._timerLabel = new base.Label("|" + Core.GameManager.Timer + "|", "16px", "Consolas", "#000000", 320, 15, true);
        this.setupTankTypes();
        this._tankSound = createjs.Sound.play("level2sd");
        this._tankSound.loop = -1;
        this._tankSound.volume = 0.7;
  
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
        this.addChild(this._p1Label);
        this.addChild(this._p2Label);
        this.addChild(this._timerLabel);
        Core.GameManager.playScene = this;
  
      }
  
  
  
      }
    
  }
  