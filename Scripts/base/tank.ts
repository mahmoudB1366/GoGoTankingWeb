module base {
    export abstract class Tank extends createjs.Bitmap {
      // private instance variables
      protected _keyboardEvent: KeyboardEvent; 

      protected _tankSpeed: number;
      protected _tankLife: number;
      protected _bulletRange: number;
      protected _bulletSpeed: number;
      protected _bulletPower: number;

     protected _left :string;
     protected _right :string;
     protected _up :string;
     protected _down :string;
     protected _fire :string;

     protected  _bullet :objects.Bullet;
  
      // public properties
      public Width: number;
      public Height: number;
      public HalfWidth: number;
      public HalfHeight: number;
      public LayerIndex : number;
      
      
  
      // constructors
      constructor(imageString:string) {
        super(Core.GameManager.assetManager.getResult(imageString));
        this.name = imageString;
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
        this.Start();
      }
  
      // public methods
      public Start(): void {

      }
  
      public Update(): void {
        
        this._keyboardEvent = Core.GameManager.KeyboardEvent;
        this.Move();
        this.CheckBounds();

        if (this._bullet != null)
        {
          this._bullet.Update();
          if (this._bullet.IsOut())
          {
            this._bullet = null;
          }
        }
      }
  
      public Reset():void {
  
      }
      protected fire():void
      {

      }
  
      public CheckBounds():void {
        //right boundary
        if(this.x >= 640 - this.HalfWidth) {
          this.x = 640 - this.HalfWidth;
        }
  
        // left boundary
        if(this.x <= this.HalfWidth) {
          this.x = this.HalfWidth;
        }
        // up boundary
        if(this.y <= this.HalfHeight) {
          this.y = this.HalfHeight;
        }
        // down boundary
        if(this.y >= 480 - this.HalfHeight) {
          this.y = 480 - this.HalfHeight;
        }
        
        

      }
  
      public Move():void {
        
        if (this._keyboardEvent !=null)
        {       
         switch(this._keyboardEvent.key) {
          case this._left:
            this.x-=this._tankSpeed;
            this.rotation = -90;
            Core.GameManager.KeyboardEvent = null;
          break;
          case this._right:
            this.x+=this._tankSpeed;
            this.rotation = +90;
            Core.GameManager.KeyboardEvent = null;
          break;
          case this._down:
            this.y+=this._tankSpeed;
            this.rotation = 180;
            Core.GameManager.KeyboardEvent = null;
          break;
          case this._up:
          this.y-=this._tankSpeed;
          this.rotation = 0;
          Core.GameManager.KeyboardEvent = null;
        break;
        case this._fire:
        if (this._bullet == null)
        {
this.fire();
        }
        Core.GameManager.KeyboardEvent = null;
      break;
        }
          
        }
      }

    }
  }
  