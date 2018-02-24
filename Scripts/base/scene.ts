module base {
  export class Scene extends createjs.Container {
    // Instance Variables

    // Public Properties
    public assetManager;

    // Constructor
    constructor() {
      super();

      this.assetManager = Core.GameManager.assetManager;
    }
    // Private Methods

    // Public Methods

    public Start():void {

    }

    public Update():void {

    }

    public Main():void {

    }
  }
}
