module objects {
    export class Bullet2 extends base.Bullet {
      // private instance variables
  
      // public properties
  
      // Constructor
      constructor(x:number,y:number,angel:number,speed:number,range:number,power:number) {
        super(x,y,angel,speed,range,power);
        this.name = "Bullet2";
        this._enemy = "Player1";
        this._enemyTank = Core.GameManager.playScene.getChildAt(1) as base.Tank;
      }
      public IsColliding2():string {
        if (this._enemyTank != null)
        {
            if((Math.abs(this.y - this._enemyTank.y) < (this.HalfHeight + this._enemyTank.HalfHeight))
          && (Math.abs(this.x - this._enemyTank.x) < (this.HalfWidth + this._enemyTank.HalfWidth)))
            {
                Core.GameManager.P1Health -=this._power;
                this.x = 10000;
            }
            return "";
      
        }
    }
    }
    }