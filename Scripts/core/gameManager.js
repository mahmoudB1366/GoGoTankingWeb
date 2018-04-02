var Core;
(function (Core) {
    var GameManager = /** @class */ (function () {
        function GameManager() {
        }
        // Tanks Properties
        GameManager.H_tank_speed = 1.5;
        GameManager.H_bullet_range = 400;
        GameManager.H_bullet_speed = 1.5;
        GameManager.H_bullet_power = 50;
        GameManager.M_tank_speed = 1.5;
        GameManager.M_bullet_range = 300;
        GameManager.M_bullet_speed = 3;
        GameManager.M_bullet_power = 40;
        GameManager.L_tank_speed = 1.5;
        GameManager.L_bullet_range = 200;
        GameManager.L_bullet_speed = 1.5;
        GameManager.L_bullet_power = 25;
        return GameManager;
    }());
    Core.GameManager = GameManager;
})(Core || (Core = {}));
//# sourceMappingURL=gameManager.js.map