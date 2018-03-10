module Levels {
    export class Obstacle extends base.GameObject{
      // private instance variables
        
      // public properties
  
      // Constructor
      constructor(x:number, y:number,name:string) {
        super(name);
        this.x = x;
        this.y =y;
        this.name = name;
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