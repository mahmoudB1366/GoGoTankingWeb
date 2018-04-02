module base {
    export class Label extends createjs.Text {
        // Private Instance Variables
            private _isCentered:boolean;
            private _locationX :number;
            private _locationY :number;
        // Public Propoerties

        // Constructor
        constructor(
            labelString: string,
            fontSize: string,
            fontFamily: string,
            fontColour: string,
            x: number = 0,
            y: number = 0,
            isCentered: boolean = false) {
            super("PLACEHOLDER", fontSize + " " + fontFamily, fontColour);
            this._isCentered = isCentered;
            this._locationX = x;
            this._locationY = y;
            this.SetText(labelString);
            //this.x = x;

            //this.y = y;
        }

        // Private Methods

        // Public Methods
        public SetText(text:string):void
        {
        this.text = text;
        //this.textAlign = "center";
        if(this._isCentered) {
            this.regX = this.getMeasuredWidth() * 0.5;
            this.regY = this.getMeasuredHeight() * 0.5;
            }
            this.x = this._locationX;
            this.y = this._locationY;
        }
    }
}