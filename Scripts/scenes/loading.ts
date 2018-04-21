module scenes {
    export class LoadScene extends base.Scene {
      // Private Instance Variables
      private _background:Levels.Background;
      private _loadingBar: base.Label;
      private _frameCounter : number;
      // Public Properties
  
      // Constructor
      constructor() {
        super();
  
        this.Start();
      }
  
      // Private Mathods
  
  
  
      // Public Methods
  
      // Initialize Game Variables and objects
      public Start(): void {
        
       // this._selectionShadow = new base.Button("selection", 100, 100);
        this._background = new Levels.Background("loading");
        this._loadingBar = new base.Label("", "20px", "Impact", "#843415", 30, 420, false);
        this._frameCounter = 0;
        
        this.Main();
      }
  
      public Update(): void {
        this._frameCounter += 1;
        if (this._frameCounter >= 3) {
          if (this._loadingBar.text.length < 107)
          {
            this._loadingBar.text +="|";
          }
          else
          {
            Core.GameManager.transferTarget = config.Scene.LEVEL1;
            Core.GameManager.currentScene = config.Scene.TRANSFER;
          }
          this._frameCounter = 0;
        }

      }
  
      // This is where the fun happens
      public Main(): void {
        this.addChild(this._background);
        this.addChild(this._loadingBar);
       
      }
    }
  }
  