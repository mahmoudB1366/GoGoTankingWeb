var config;
(function (config) {
    var Controllers = /** @class */ (function () {
        function Controllers() {
        }
        //Player1
        Controllers.P1_LEFT = 'a';
        Controllers.P1_RIGHT = 'd';
        Controllers.P1_UP = 'w';
        Controllers.P1_DOWN = 's';
        Controllers.P1_FIRE = 'q';
        //Player2
        Controllers.P2_LEFT = 'j';
        Controllers.P2_RIGHT = 'l';
        Controllers.P2_UP = 'i';
        Controllers.P2_DOWN = 'k';
        Controllers.P2_FIRE = 'p';
        return Controllers;
    }());
    config.Controllers = Controllers;
})(config || (config = {}));
//# sourceMappingURL=controllers.js.map