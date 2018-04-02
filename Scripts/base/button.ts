module base {
    export class Button extends createjs.Bitmap {
        // Private Instance Variables

        // Public Properties

        // Constructor
        constructor(imageString:string, x:number= 0, y:number = 0 ) {
            super(Core.GameManager.assetManager.getResult(imageString));

            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            this.name = imageString;
            this.x = x;
            this.y = y;

            this.on("mouseover", this._mouseOver);
            this.on("mouseout", this._mouseOut);
        }
        // Private Methods
        private _mouseOver():void {
            this.alpha = 0.7;
        }

        private _mouseOut():void {
            this.alpha = 1.0;
        }

        // Public Methods
        public setCoordination(x:number,y:number):void{
            this.x = x;
            this.y = y;
        }
    }
}
