var Core;
(function (Core) {
    var GameManager = /** @class */ (function () {
        function GameManager() {
        }
        // Tanks Properties
        GameManager.H_tank_speed = 1.5;
        GameManager.H_bullet_range = 1.5;
        GameManager.H_bullet_speed = 1.5;
        GameManager.H_bullet_power = 50;
        GameManager.M_tank_speed = 1.5;
        GameManager.M_bullet_range = 1.5;
        GameManager.M_bullet_speed = 3;
        GameManager.M_bullet_power = 40;
        GameManager.L_tank_speed = 1.5;
        GameManager.L_bullet_range = 1.5;
        GameManager.L_bullet_speed = 1.5;
        GameManager.L_bullet_power = 25;
        //Controllers
        GameManager.P1_LEFT = 'a';
        GameManager.P1_RIGHT = 'd';
        GameManager.P1_UP = 'w';
        GameManager.P1_DOWN = 's';
        GameManager.P1_FIRE = 'm';
        GameManager.P2_LEFT = 'j';
        GameManager.P2_RIGHT = 'l';
        GameManager.P2_UP = 'i';
        GameManager.P2_DOWN = 'k';
        GameManager.P2_FIRE = 'p';
        return GameManager;
    }());
    Core.GameManager = GameManager;
})(Core || (Core = {}));
//# sourceMappingURL=gameManager.js.map