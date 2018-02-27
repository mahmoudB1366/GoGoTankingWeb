module objects {
    export class P1Heavy extends base.Tank {
      // private instance variables
  
      // public properties
  
      // Constructor
      constructor() {
        super("p1heavy");
        this.setTankProperties();
        this.setController();
        this.Start();
        
      }
  
      // private methods

      //set Tank Properties
      private setTankProperties():void{
        this._tankSpeed = Core.GameManager.H_tank_speed;
        this._bulletSpeed = Core.GameManager.H_bullet_speed
        this._bulletRange = Core.GameManager.H_bullet_range;
        this._bulletPower = Core.GameManager.H_bullet_power;
        this._tankLife = 100;
        Core.GameManager.P1Health = 100;
      }
      //set Controllers
      protected setController():void{
        this._moveLeft = Core.GameManager.keyboardManager.P1Left;
        this._moveRight = Core.GameManager.keyboardManager.P1Right;
        this._moveUp = Core.GameManager.keyboardManager.P1Up;
        this._moveDown = Core.GameManager.keyboardManager.P1Down;
        this._startFire = Core.GameManager.keyboardManager.P1Fire;
     }
      // public methods
  
      // Initializes variables and creates new objects
      public Start():void {
        this.y = 430;
        this.x = 200;
      }
  
      // updates the game object every frame
      public Update():void {
        super.Update();
        
      }

      protected fire():void
      {
        this._bullet = new objects.Bullet1(this.x,this.y,this.rotation,
          this._bulletSpeed,this._bulletRange,this._bulletPower);
          this.parent.addChild(this._bullet);
      }
  
    }
  }
  