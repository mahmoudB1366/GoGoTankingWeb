var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.CheckBullet = function (object1, object2, enemyName) {
            // define points for both object1 and object2
            var P1 = new math.Vec2(object1.x, object1.y);
            var P2 = new math.Vec2(object2.x, object2.y);
            // check if there is a collision
            if (math.Vec2.Distance(P1, P2) < (object1.HalfHeight + object2.HalfHeight)) {
                if (!object2.IsColliding) {
                    object2.IsColliding = true;
                    createjs.Sound.play("explosion");
                    switch (object2.name) {
                        case enemyName:
                            //createjs.Sound.play("yay");
                            if (enemyName == "Player2")
                                Core.GameManager.P2Health -= object1._power;
                            else if (enemyName == "Player1")
                                Core.GameManager.P1Health -= object1._power;
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
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collisionManager.js.map