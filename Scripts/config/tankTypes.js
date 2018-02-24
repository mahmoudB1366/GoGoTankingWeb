var config;
(function (config) {
    var tankTypes;
    (function (tankTypes) {
        tankTypes[tankTypes["HEAVY"] = 0] = "HEAVY";
        tankTypes[tankTypes["MEDIUM"] = 1] = "MEDIUM";
        tankTypes[tankTypes["LIGHT"] = 2] = "LIGHT";
    })(tankTypes = config.tankTypes || (config.tankTypes = {}));
})(config || (config = {}));
//# sourceMappingURL=tankTypes.js.map