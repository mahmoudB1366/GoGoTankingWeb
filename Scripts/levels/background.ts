module Levels {
    export class Background extends createjs.Bitmap {
      // private instance variables
        
      // public properties
  
      // Constructor
      constructor(imageString:string) {
        super(Core.GameManager.assetManager.getResult(imageString));
        this.Start();
      }
  
      // private methods
  
      // public methods
  
      // Initializes variables and creates new objects
      public Start():void {

      }
  
      // updates the game object every frame
      public Update():void {

      }
    }
  }