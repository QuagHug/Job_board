"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EApplicationStatus = exports.EMode = exports.ELevel = exports.EUserType = exports.EVerificationType = void 0;
var EVerificationType;
(function (EVerificationType) {
    EVerificationType["password"] = "password";
    EVerificationType["code"] = "code";
    EVerificationType["google"] = "google";
    EVerificationType["facebook"] = "facebook";
})(EVerificationType = exports.EVerificationType || (exports.EVerificationType = {}));
var EUserType;
(function (EUserType) {
    EUserType["candidate"] = "candidate";
    EUserType["recruiter"] = "recruiter";
})(EUserType = exports.EUserType || (exports.EUserType = {}));
var ELevel;
(function (ELevel) {
    ELevel["fresher"] = "fresher";
    ELevel["junior"] = "junior";
    ELevel["senior"] = "senior";
    ELevel["leader"] = "leader";
    ELevel["cLevel"] = "cLevel";
})(ELevel = exports.ELevel || (exports.ELevel = {}));
var EMode;
(function (EMode) {
    EMode["onsite"] = "onsite";
    EMode["remote"] = "remote";
    EMode["hybrid"] = "hybrid";
})(EMode = exports.EMode || (exports.EMode = {}));
var EApplicationStatus;
(function (EApplicationStatus) {
    EApplicationStatus["active"] = "active";
    EApplicationStatus["cancel"] = "cancel";
    EApplicationStatus["pending"] = "pending";
})(EApplicationStatus = exports.EApplicationStatus || (exports.EApplicationStatus = {}));
//# sourceMappingURL=index.js.map