module base {
    export abstract class Bullet extends base.GameObject {
      // private instance variables
      public _range: number;
      public _speed: number;
      public _power: number;
      public _initX: number;
      public _initY: number;
      public _angel : number;

      protected _enemy : string;
      protected _enemyTank : base.Tank;

      // public properties
      public IsBulletOut():void {
        //right boundary
        if((this.x >= 640 + this.HalfWidth) || (this.x <= -this.HalfWidth)
        || (this.y <= -this.HalfHeight) || (this.y >= 480 + this.HalfHeight))
        {
          this.x = 10000;
          this.y = 10000;
        }     
      }
      
  
      // constructors
      constructor(x:number,y:number,angel:number,speed:number,range:number,power:number) {
        super("bullet");
        this._initX = x;
        this._initY = y;
        this._angel = angel;
        this._speed = speed;
        this._range = range;
        this._power = power;
        this.x = x;
        this.y = y;

         this.Start();
    }
      // private methods

  
      // public methods
      public Start(): void {

      }
  
      public Update(): void {
    

        
        this.Move();
        this.IsBulletOut();
        //
      }
  
  
      
  
      public Move():void {
         switch(this._angel) {
          case -45:
            this.x-=this._speed;
            this.y-=this._speed;
          break;
          case -90:
          this.x-=this._speed;
        break;
        case -135:
        this.x-=this._speed;
        this.y+=this._speed;
      break;
      case +45:
      this.x+=this._speed;
      this.y-=this._speed;
    break;
          case 90:
            this.x+=this._speed;
          break;
          case +135:
          this.x+=this._speed;
          this.y+=this._speed;
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
  