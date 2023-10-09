"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPreferedLang = void 0;
const i18n_1 = __importDefault(require("i18n"));
const setPreferedLang = (req, res, next) => {
    const preferredLanguage = req.acceptsLanguages('en', 'mm');
    i18n_1.default.setLocale(preferredLanguage || 'en');
    next();
};
exports.setPreferedLang = setPreferedLang;
