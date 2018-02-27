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
      public IsBulletOut():boolean {
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
      
  
      // constructors
      constructor(x:number,y:number,angel:number,speed:number,range:number,power:number) {
        super("bullet");
        this.name ="bullet";
        this._initX = x;
        this._initY = y;
        this._angel = angel;
        this._speed = speed;
        this._range = range;
        this._power = power;

         this.Start();
    }
      // private methods

  
      // public methods
      public Start(): void {
        this.x = this._initX;
        this.y = this._initY;
      }
  
      public Update(): void {
        
        this.Move();
        this.IsColliding2();
        //
      }
  
      protected IsColliding2():string {
  return "";
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
  