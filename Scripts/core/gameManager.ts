module Core {
    export class GameManager {
      public static stage: createjs.Stage;
      public static assetManager: createjs.LoadQueue;
      public static currentScene: number;
      public static KeyboardEvent: KeyboardEvent;
      public static playScene : base.Scene;
      public static Timer:number;

      public static P1Health:number;
      public static P2Health:number;

// Tanks Properties
      public static H_tank_speed = 1.5;
      public static H_bullet_range = 1.5;
      public static H_bullet_speed = 1.5;
      public static H_bullet_power = 50;

      public static M_tank_speed = 1.5;
      public static M_bullet_range = 1.5;
      public static M_bullet_speed = 3;
      public static M_bullet_power = 40;

      public static L_tank_speed = 1.5;
      public static L_bullet_range = 1.5;
      public static L_bullet_speed = 1.5;
      public static L_bullet_power = 25;

      //Controllers
      public static P1_LEFT = 'a';
      public static P1_RIGHT = 'd';
      public static P1_UP = 'w';
      public static P1_DOWN = 's';
      public static P1_FIRE = 'm';

      public static P2_LEFT = 'j';
      public static P2_RIGHT = 'l';
      public static P2_UP = 'i';
      public static P2_DOWN = 'k';
      public static P2_FIRE = 'p';

      //Level Winners
      public static Level1Winner:string;
      public static Level2Winner:string;
      public static Level3Winner:string;

      //Players Tank Selections
      public static Player1TankType:config.tankTypes;
      public static Player2TankType:config.tankTypes;


    }
  }