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
                        switch (objects[i].name) {
                            case enemyName:
                                if (enemyName == "Player2") {
                                    if (Core.GameManager.Timer < 30 || Core.GameManager.P2Health <= itSelf._power) {
                                        Core.GameManager.P2Health = 0;
                                    }
                                    else {
                                        Core.GameManager.P2Health -= itSelf._power;
                                    }
                                }
                                else if (enemyName == "Player1") {
                                    if (Core.GameManager.Timer < 30 || Core.GameManager.P1Health <= itSelf._power) {
                                        Core.GameManager.P1Health = 0;
                                    }
                                    else {
                                        Core.GameManager.P1Health -= itSelf._power;
                                    }
                                }
                                this._sound = createjs.Sound.play("explosion");
                                this._sound.volume = 0.1;
                                break;
                            case "stone":
                            case "house":
                                this._sound = createjs.Sound.play("explosion3");
                                this._sound.volume = 0.1;
                                break;
                            case "wood":
                                this._sound = createjs.Sound.play("explosion2");
                                this._sound.volume = 0.1;
                                objects[i].Life -= 35;
                                (objects[i].Life == 65) ? objects[i].gotoAndPlay("wood2") : objects[i].gotoAndPlay("wood3");
                                break;
                            case "mine":
                                this._sound = createjs.Sound.play("explosion");
                                this._sound.volume = 0.1;
                                objects[i].x = 5000;
                                objects[i].y = 5000;
                                objects[i].IsColliding = false;
                                break;
                            case "star":
                                this._sound = createjs.Sound.play("starsd");
                                this._sound.volume = 0.1;
                                objects[i].x = 5000;
                                objects[i].y = 5000;
                                objects[i].IsColliding = false;
                                if (enemyName == "Player2")
                                    Core.GameManager.P1Tank.TankSpeed += 0.2;
                                if (enemyName == "Player1")
                                    Core.GameManager.P2Tank.TankSpeed += 0.2;
                                break;
                            case "health":
                                this._sound = createjs.Sound.play("powerup");
                                this._sound.volume = 0.1;
                                objects[i].x = 5000;
                                objects[i].y = 5000;
                                objects[i].IsColliding = false;
                                if (enemyName == "Player2")
                                    Core.GameManager.P1Health = 100;
                                if (enemyName == "Player1")
                                    Core.GameManager.P2Health = 100;
                                break;
                            case "range":
                                this._sound = createjs.Sound.play("rangesd");
                                this._sound.volume = 0.1;
                                objects[i].x = 5000;
                                objects[i].y = 5000;
                                objects[i].IsColliding = false;
                                if (enemyName == "Player2")
                                    Core.GameManager.P1Tank.BulletRange += 40;
                                if (enemyName == "Player1")
                                    Core.GameManager.P2Tank.BulletRange += 40;
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
                            case "house":
                            case enemyName:
                                this.forceOut(itSelf, objects[i]);
                                //Customize if required
                                break;
                            case "mine":
                                if ((Core.GameManager.P1Health != 0) && (Core.GameManager.P2Health != 0)) {
                                    this._sound = createjs.Sound.play("explosion");
                                    this._sound.volume = 0.1;
                                }
                                if (enemyName == "Player2")
                                    Core.GameManager.P1Health = 0;
                                if (enemyName == "Player1")
                                    Core.GameManager.P2Health = 0;
                                break;
                            case "star":
                                createjs.Sound.play("starsd");
                                objects[i].x = 5000;
                                objects[i].y = 5000;
                                objects[i].IsColliding = false;
                                if (enemyName == "Player2")
                                    Core.GameManager.P1Tank.TankSpeed += 0.2;
                                if (enemyName == "Player1")
                                    Core.GameManager.P2Tank.TankSpeed += 0.2;
                                break;
                            case "health":
                                createjs.Sound.play("powerup");
                                objects[i].x = 5000;
                                objects[i].y = 5000;
                                objects[i].IsColliding = false;
                                if (enemyName == "Player2")
                                    Core.GameManager.P1Health = 100;
                                if (enemyName == "Player1")
                                    Core.GameManager.P2Health = 100;
                                break;
                            case "range":
                                createjs.Sound.play("rangesd");
                                objects[i].x = 5000;
                                objects[i].y = 5000;
                                objects[i].IsColliding = false;
                                if (enemyName == "Player2")
                                    Core.GameManager.P1Tank.BulletRange += 40;
                                if (enemyName == "Player1")
                                    Core.GameManager.P2Tank.BulletRange += 40;
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
            if (tank.name == "Player1")
                switch (tank.rotation) {
                    case 0:
                        Core.GameManager.keyboardManager.P1Up = false;
                        break;
                    case -45:
                        Core.GameManager.keyboardManager.P1Left = false;
                        Core.GameManager.keyboardManager.P1Up = false;
                        break;
                    case -90:
                        Core.GameManager.keyboardManager.P1Left = false;
                        break;
                    case 90:
                        Core.GameManager.keyboardManager.P1Right = false;
                        break;
                    case 180:
                        Core.GameManager.keyboardManager.P1Down = false;
                        break;
                    case 45:
                        Core.GameManager.keyboardManager.P1Right = false;
                        Core.GameManager.keyboardManager.P1Up = false;
                        break;
                    case -135:
                        Core.GameManager.keyboardManager.P1Left = false;
                        Core.GameManager.keyboardManager.P1Down = false;
                        break;
                    case 135:
                        Core.GameManager.keyboardManager.P1Right = false;
                        Core.GameManager.keyboardManager.P1Down = false;
                        break;
                }
            if (tank.name == "Player2")
                switch (tank.rotation) {
                    case 0:
                        Core.GameManager.keyboardManager.P2Up = false;
                        break;
                    case -45:
                        Core.GameManager.keyboardManager.P2Left = false;
                        Core.GameManager.keyboardManager.P2Up = false;
                        break;
                    case -90:
                        Core.GameManager.keyboardManager.P2Left = false;
                        break;
                    case 90:
                        Core.GameManager.keyboardManager.P2Right = false;
                        break;
                    case 180:
                        Core.GameManager.keyboardManager.P2Down = false;
                        break;
                    case 45:
                        Core.GameManager.keyboardManager.P2Right = false;
                        Core.GameManager.keyboardManager.P2Up = false;
                        break;
                    case -135:
                        Core.GameManager.keyboardManager.P2Left = false;
                        Core.GameManager.keyboardManager.P2Down = false;
                        break;
                    case 135:
                        Core.GameManager.keyboardManager.P2Right = false;
                        Core.GameManager.keyboardManager.P2Down = false;
                        break;
                }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
/*
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
 */ 
//# sourceMappingURL=collisionManager.js.map