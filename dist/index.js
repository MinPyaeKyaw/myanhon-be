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
const path_1 = __importDefault(require("path"));
const i18n_1 = __importDefault(require("i18n"));
const dotenv = __importStar(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const courses_1 = __importDefault(require("./routes/courses"));
const courseTypes_1 = __importDefault(require("./routes/courseTypes"));
const courseLevels_1 = __importDefault(require("./routes/courseLevels"));
const user_1 = __importDefault(require("./routes/user"));
// import adminAuthRoute from './routes/admin/auth'
// import roleRoutes from './routes/admin/roles'
// import permissionRoutes from './routes/admin/permissions'
// import adminRoutes from './routes/admin/admins'
// import adminCourseRoute from './routes/admin/courses'
const payment_1 = __importDefault(require("./routes/payment/payment"));
const questioniar_1 = __importDefault(require("./routes/questioniar"));
const suggestoin_1 = __importDefault(require("./routes/suggestoin"));
const exam_1 = __importDefault(require("./routes/exam"));
const apiKeyMiddleware_1 = require("./middlewares/jwt/apiKeyMiddleware");
const tracking_1 = __importDefault(require("./routes/tracking"));
const setPreferedLang_1 = require("./middlewares/i18n/setPreferedLang");
dotenv.config({ path: path_1.default.join(__dirname, "/.env'") });
dotenv.config();
i18n_1.default.configure({
    locales: ['en', 'mm'],
    defaultLocale: 'en',
    directory: path_1.default.join(__dirname, '/locales'), // Directory containing translation files
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(i18n_1.default.init);
app.use(apiKeyMiddleware_1.apiKeyMiddleware);
app.use(setPreferedLang_1.setPreferedLang);
app.get('/test', (req, res) => {
    res.json({ hello: res.__('hello') });
});
// Admin routes
// const adminAPIPrefix: string = process.env.API_PREFIX + '/admin'
// app.use(adminAPIPrefix + '/auth', adminAuthRoute)
// app.use(adminAPIPrefix, roleRoutes)
// app.use(adminAPIPrefix, permissionRoutes)
// app.use(adminAPIPrefix, adminRoutes)
// app.use(adminAPIPrefix, adminCourseRoute)
// User routes
app.use(process.env.API_PREFIX + '/auth', auth_1.default);
app.use(process.env.API_PREFIX, courses_1.default);
app.use(process.env.API_PREFIX, courseTypes_1.default);
app.use(process.env.API_PREFIX, courseLevels_1.default);
app.use(process.env.API_PREFIX, user_1.default);
app.use(process.env.API_PREFIX, payment_1.default);
app.use(process.env.API_PREFIX, questioniar_1.default);
app.use(process.env.API_PREFIX, suggestoin_1.default);
app.use(process.env.API_PREFIX, exam_1.default);
app.use(process.env.API_PREFIX, tracking_1.default);
app.listen(4000, () => {
    console.log('now listening to 4000');
});
exports.default = app;
