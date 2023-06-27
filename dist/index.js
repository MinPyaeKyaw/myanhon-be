"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const courses_1 = __importDefault(require("./routes/courses"));
const courseTypes_1 = __importDefault(require("./routes/courseTypes"));
const courseLevels_1 = __importDefault(require("./routes/courseLevels"));
const user_1 = __importDefault(require("./routes/user"));
const auth_2 = __importDefault(require("./routes/admin/auth"));
const roles_1 = __importDefault(require("./routes/admin/roles"));
const permissions_1 = __importDefault(require("./routes/admin/permissions"));
const admins_1 = __importDefault(require("./routes/admin/admins"));
const courses_2 = __importDefault(require("./routes/admin/courses"));
dotenv.config({ path: __dirname + '/.env' });
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Admin routes
let adminAPIPrefix = process.env.API_PREFIX + '/admin';
app.use(adminAPIPrefix + '/auth', auth_2.default);
app.use(adminAPIPrefix, roles_1.default);
app.use(adminAPIPrefix, permissions_1.default);
app.use(adminAPIPrefix, admins_1.default);
app.use(adminAPIPrefix, courses_2.default);
// User routes
app.use(process.env.API_PREFIX + '/auth', auth_1.default);
app.use(`${process.env.API_PREFIX}`, courses_1.default);
app.use(`${process.env.API_PREFIX}`, courseTypes_1.default);
app.use(`${process.env.API_PREFIX}`, courseLevels_1.default);
app.use(`${process.env.API_PREFIX}`, user_1.default);
app.listen(4000, () => {
    console.log("now listening to 4000");
});
exports.default = app;
