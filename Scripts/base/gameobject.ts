module base {
  export class GameObject extends createjs.Bitmap {
    // private instance variables
    protected _dx: number;
    protected _dy: number;

    // public properties
    public Width: number;
    public Height: number;
    public HalfWidth: number;
    public HalfHeight: number;
    public IsColliding: boolean;

    // constructors
    constructor( imageString:string) {
      super(Core.GameManager.assetManager.getResult(imageString));
      this.name = imageString;
      this._initialize();
  }
    // private methods
    protected _initialize():void {
      this.Width = this.getBounds().width;
      this.Height = this.getBounds().height;
      this.HalfWidth = this.Width * 0.5;
      this.HalfHeight = this.Height * 0.5;
      this.regX = this.HalfWidth;
      this.regY = this.HalfHeight;
      this.IsColliding = false;
    }

    // public methods
    public Start(): void {

    }

    public Update(): void {

    }

    public Reset():void {

    }

    public CheckBounds():void {

    }

    public Move():void {

    }
  }
}
