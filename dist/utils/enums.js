"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_TYPES = exports.ROLES = exports.CACHE_KEYS = exports.COURSE_TYPES = exports.COURSE_LEVELS = void 0;
var COURSE_LEVELS;
(function (COURSE_LEVELS) {
    COURSE_LEVELS["N5"] = "N5";
    COURSE_LEVELS["N4"] = "N4";
    COURSE_LEVELS["N3"] = "N3";
    COURSE_LEVELS["N2"] = "N2";
    COURSE_LEVELS["N1"] = "N1";
})(COURSE_LEVELS || (exports.COURSE_LEVELS = COURSE_LEVELS = {}));
var COURSE_TYPES;
(function (COURSE_TYPES) {
    COURSE_TYPES["GRAMMER"] = "grammer";
    COURSE_TYPES["LISTENING"] = "listening";
    COURSE_TYPES["READING"] = "reading";
    COURSE_TYPES["KANJI"] = "kanji";
    COURSE_TYPES["VOCABURARY"] = "vocaburary";
    COURSE_TYPES["SPEAKING"] = "speaking";
    COURSE_TYPES["VLOG"] = "vlog";
})(COURSE_TYPES || (exports.COURSE_TYPES = COURSE_TYPES = {}));
var CACHE_KEYS;
(function (CACHE_KEYS) {
    CACHE_KEYS["TYPES"] = "types";
    CACHE_KEYS["LEVELS"] = "levels";
})(CACHE_KEYS || (exports.CACHE_KEYS = CACHE_KEYS = {}));
var ROLES;
(function (ROLES) {
    ROLES["SUPER_ADMIN"] = "superAdmin";
    ROLES["ADMIN"] = "admin";
    ROLES["EDITOR"] = "editor";
    ROLES["VIEWER"] = "viewer";
})(ROLES || (exports.ROLES = ROLES = {}));
var JWT_TYPES;
(function (JWT_TYPES) {
    JWT_TYPES["REFRESH"] = "refreshToken";
    JWT_TYPES["ACCESS"] = "accessToken";
    JWT_TYPES["RESET_PASSWORD"] = "resetPasswordToken";
    JWT_TYPES["CONFIRM_PASSWORD"] = "confirmPasswordToken";
    JWT_TYPES["OTP"] = "otpToken";
})(JWT_TYPES || (exports.JWT_TYPES = JWT_TYPES = {}));
