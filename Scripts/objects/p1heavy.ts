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
      private setController():void{
        this._left = Core.GameManager.P1_LEFT;
        this._right = Core.GameManager.P1_RIGHT;
        this._up = Core.GameManager.P1_UP;
        this._down = Core.GameManager.P1_DOWN;
        this._fire = Core.GameManager.P1_FIRE;
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
  