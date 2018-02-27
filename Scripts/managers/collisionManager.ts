module managers {
  export class Collision {


    public static CheckBullet(object1:base.GameObject, object2:base.GameObject,enemyName:string):void {
      // define points for both object1 and object2
      let P1 = new math.Vec2(object1.x, object1.y);
      let P2 = new math.Vec2(object2.x, object2.y);

      // check if there is a collision
      if(math.Vec2.Distance(P1, P2 ) <  (object1.HalfHeight + object2.HalfHeight) ) {
          if(!object2.IsColliding) {
            object2.IsColliding = true;
            createjs.Sound.play("explosion");
            switch(object2.name) {
              case enemyName:
                //createjs.Sound.play("yay");
                if (enemyName == "Player2")
                Core.GameManager.P2Health -=(object1 as base.Bullet)._power;
                else if (enemyName == "Player1")
                Core.GameManager.P1Health -=(object1 as base.Bullet)._power;
                object1.parent.removeChild(object1);
                
              break;
              case "stone":
                //createjs.Sound.play("thunder");
                
              break;
            }

          }
      }
      else {
        object2.IsColliding = false;
      }
    }
  }
}
