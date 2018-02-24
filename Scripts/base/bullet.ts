module base {
    export abstract class Bullet extends createjs.Bitmap {
      // private instance variables
      protected _range: number;
      protected _speed: number;
      protected _power: number;
      protected _initX: number;
      protected _initY: number;
      protected _angel : number;

      protected _enemy : string;
      protected _enemyTank : base.Tank;

      // public properties
      public Width: number;
      public Height: number;
      public HalfWidth: number;
      public HalfHeight: number;
      public LayerIndex : number;
      
      
  
      // constructors
      constructor(x:number,y:number,angel:number,speed:number,range:number,power:number) {
        super(Core.GameManager.assetManager.getResult("bullet"));
        this.name ="bullet";
        this._initX = x;
        this._initY = y;
        this._angel = angel;
        this._speed = speed;
        this._range = range;
        this._power = power;

        this._initialize();
    }
      // private methods
      private _initialize():void {
        this.Width = this.getBounds().width;
        this.Height = this.getBounds().height;
        this.HalfWidth = this.Width * 0.5;
        this.HalfHeight = this.Height * 0.5;
        this.regX = this.HalfWidth;
        this.regY = this.HalfHeight;

        this.x = this._initX;
        this.y = this._initY;

        this.Start();
      }
  
      // public methods
      public Start(): void {

      }
  
      public Update(): void {
        
        this.Move();
        this.IsColliding();
        //
      }
  
      protected IsColliding():string {
  return "";
      }
  
      public IsOut():boolean {
        //right boundary
        if(this.x >= 640 + this.HalfWidth) {
        return true;
        }
  
        // left boundary
       else if(this.x <= -this.HalfWidth) {
        return true;
        }
        // up boundary
        else if(this.y <= -this.HalfHeight) {
            return true;
        }
        // down boundary
        else if(this.y >= 480 + this.HalfHeight) {
            return true;
        }
        return false;
        

      }
  
      public Move():void {
        
         switch(this._angel) {
          case -90:
            this.x-=this._speed;
          break;
          case 90:
            this.x+=this._speed;
          break;
          case 180:
            this.y+=this._speed;
          break;
          case 0:
          this.y-=this._speed;
        break;
        }
          
        
      }

    }
  }
  