module base {
    export abstract class Tank extends base.GameObject {
      // private instance variables
      protected _keyboardEvent: KeyboardEvent; 

      protected _tankSpeed: number;
      protected _tankLife: number;
      protected _bulletRange: number;
      protected _bulletSpeed: number;
      protected _bulletPower: number;

     protected _moveLeft :boolean;
     protected _moveRight :boolean;
     protected _moveUp :boolean;
     protected _moveDown :boolean;
     protected _startFire :boolean;

     protected  _bullet :base.Bullet;
     
      // public properties
      
      
  
      // constructors
      constructor(imageString:string) {
        super(imageString);
        this.name = imageString;

        //this._initialize();
        this.Start();
    }
      // private methods
      
      // public methods
      public Start(): void {
        
      }
  
      public Update(): void {
        
        this.Move();
        this.CheckBounds();
        

        if (this._bullet != null)
        {
          this._bullet.Update();
          if (this._bullet.IsBulletOut())
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
      protected setController():void{
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
        this.setController();
        if((this._moveLeft) && (this._moveUp)) {
          this.x -= this._tankSpeed;
          this.y -= this._tankSpeed;
          this.rotation = -45;
        }
        else if((this._moveLeft) && (this._moveDown)) {
          this.x -= this._tankSpeed;
          this.y += this._tankSpeed;
          this.rotation = -135;
        }
        else if((this._moveRight) && (this._moveDown)) {
          this.x += this._tankSpeed;
          this.y += this._tankSpeed;
          this.rotation = 135;
        }
        else if((this._moveRight) && (this._moveUp)) {
          this.x += this._tankSpeed;
          this.y -= this._tankSpeed;
          this.rotation = 45;
        }
        else if(this._moveLeft) {
          this.x -= this._tankSpeed;
          this.rotation = -90;
        }
        else if(this._moveRight) {
          this.x += this._tankSpeed;
          this.rotation = 90;
        }
        else if(this._moveUp) {
          this.y -= this._tankSpeed;
          this.rotation = 0;
        }
        else if(this._moveDown) {
          this.y += this._tankSpeed;
          this.rotation = 180;
        }
        else if(this._startFire) {
          if (this._bullet == null)
          {
            createjs.Sound.play("fire");
            this.fire();
          }
          
        }
        
      }

    }
  }
  