module managers {
    export class KeyboardManager {
      // private instance variables
  
      // Public Properties
      public P1Left: boolean;
      public P1Right: boolean;
      public P1Up: boolean;
      public P1Down: boolean;
      public P1Fire: boolean;

      public P2Left: boolean;
      public P2Right: boolean;
      public P2Up: boolean;
      public P2Down: boolean;
      public P2Fire: boolean;

      public enabled: boolean;
      public paused: boolean;
  
      // Constructors
      constructor() {
        this.enabled = false;
        this.P1Left = false;
        document.addEventListener('keydown', this.onKeyDown.bind(this), false);
        document.addEventListener('keyup', this.onKeyUp.bind(this), false);
      }
  
      // private methods
  
      // public methods
      public onKeyDown(event: KeyboardEvent):void {
        switch(event.key) {
          case config.Controllers.P1_UP:
            this.P1Up = true;
          break;
  
          case config.Controllers.P1_LEFT:
            this.P1Left = true;
          break;
  
          case config.Controllers.P1_DOWN:
            this.P1Down = true;
          break;
  
          case config.Controllers.P1_RIGHT:
            this.P1Right = true;
          break;
  
          case config.Controllers.P1_FIRE:
            this.P1Fire = true;
          break;
          case config.Controllers.P2_UP:
          this.P2Up = true;
        break;

        case config.Controllers.P2_LEFT:
          this.P2Left = true;
        break;

        case config.Controllers.P2_DOWN:
          this.P2Down = true;
        break;

        case config.Controllers.P2_RIGHT:
          this.P2Right = true;
        break;

        case config.Controllers.P2_FIRE:
          this.P2Fire = true;
        break;
        }
  
      }
  
      public onKeyUp(event: KeyboardEvent):void {
        switch(event.key) {
            case config.Controllers.P1_UP:
              this.P1Up = false;
            break;
    
            case config.Controllers.P1_LEFT:
              this.P1Left = false;
            break;
    
            case config.Controllers.P1_DOWN:
              this.P1Down = false;
            break;
    
            case config.Controllers.P1_RIGHT:
              this.P1Right = false;
            break;
    
            case config.Controllers.P1_FIRE:
              this.P1Fire = false;
            break;
            case config.Controllers.P2_UP:
            this.P2Up = false;
          break;
  
          case config.Controllers.P2_LEFT:
            this.P2Left = false;
          break;
  
          case config.Controllers.P2_DOWN:
            this.P2Down = false;
          break;
  
          case config.Controllers.P2_RIGHT:
            this.P2Right = false;
          break;
  
          case config.Controllers.P2_FIRE:
            this.P2Fire = false;
          break;
          }
        }
      }
    }

  