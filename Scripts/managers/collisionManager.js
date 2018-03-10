var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.CheckBullet = function (itSelf, objects, enemyName) {
            // define points for both object1 and object2
            var i = 0;
            var P1 = new math.Vec2(itSelf.x, itSelf.y);
            while (objects[i] != null) {
                var P2 = new math.Vec2(objects[i].x, objects[i].y);
                // check if there is a collision
                if ((math.Vec2.Distance(P1, P2) < (itSelf.HalfHeight + objects[i].HalfHeight))
                    || (math.Vec2.Distance(P1, P2) < (itSelf.HalfWidth + objects[i].HalfWidth))) {
                    if (!objects[i].IsColliding) {
                        objects[i].IsColliding = true;
                        console.log("colide with :" + objects[i].name);
                        console.log("enemy Name :" + enemyName);
                        switch (objects[i].name) {
                            case enemyName:
                                //createjs.Sound.play("yay");
                                if (enemyName == "Player2")
                                    Core.GameManager.P2Health -= itSelf._power;
                                if (enemyName == "Player1")
                                    Core.GameManager.P1Health -= itSelf._power;
                                break;
                            case "stone":
                                createjs.Sound.play("explosion");
                                break;
                            case "wood":
                                createjs.Sound.play("explosion");
                                break;
                            default:
                                continue;
                        }
                        itSelf.x = 10000;
                        itSelf.y = 10000;
                    }
                }
                else {
                    objects[i].IsColliding = false;
                }
                ++i;
            }
        };
        Collision.CheckTank = function (itSelf, objects, enemyName) {
            // define points for both object1 and object2
            var i = 0;
            var P1 = new math.Vec2(itSelf.x, itSelf.y);
            while (objects[i] != null) {
                var P2 = new math.Vec2(objects[i].x, objects[i].y);
                // check if there is a collision
                if ((math.Vec2.Distance(P1, P2) < (itSelf.HalfHeight + objects[i].HalfHeight))
                    || (math.Vec2.Distance(P1, P2) < (itSelf.HalfWidth + objects[i].HalfWidth))) {
                    if (itSelf.name == objects[i].name) {
                        ++i;
                        continue;
                    }
                    if (!objects[i].IsColliding) {
                        objects[i].IsColliding = true;
                        switch (objects[i].name) {
                            case "stone":
                            case "wood":
                            case "sea":
                            case enemyName:
                                this.forceOut(itSelf, objects[i]);
                                //Customize if required
                                break;
                            case "mine":
                                itSelf.parent.removeChild(itSelf);
                                break;
                        }
                    }
                }
                else {
                    objects[i].IsColliding = false;
                }
                ++i;
            }
        };
        Collision.forceOut = function (tank, obstacle) {
            if ((tank.x < obstacle.x) && (tank.rotation >= 45) && (tank.rotation <= 135)) {
                tank.x = obstacle.x - obstacle.HalfWidth - tank.HalfWidth - 2;
            }
            else if ((tank.x > obstacle.x) && (tank.rotation <= -45) && (tank.rotation >= -135)) {
                tank.x = obstacle.x + obstacle.HalfWidth + tank.HalfWidth + 2;
            }
            else if ((tank.y > obstacle.y)) {
                tank.y = obstacle.y + obstacle.HalfHeight + tank.HalfHeight + 2;
            }
            else {
                tank.y = obstacle.y - obstacle.HalfHeight - tank.HalfHeight - 2;
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collisionManager.js.map