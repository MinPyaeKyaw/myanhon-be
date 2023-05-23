"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.verfiyCode = exports.checkEmail = exports.inviteAdmin = exports.createAdmin = exports.login = exports.test = void 0;
const client_1 = require("@prisma/client");
const functions_1 = require("../../utils/functions");
const nodeMailerFn_1 = __importDefault(require("../../utils/nodeMailerFn"));
const dayjs_1 = __importDefault(require("dayjs"));
const prisma = new client_1.PrismaClient();
const test = (req, res) => {
    res.json({
        test: 'controller test'
    });
};
exports.test = test;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield prisma.admins.findFirst({
            where: {
                email: req.body.email
            }
        });
        if (!admin) {
            return (0, functions_1.writeJsonRes)(res, 404, null, "This email hasn't been registered yet!");
        }
        // @ts-ignore
        if ((0, dayjs_1.default)(new Date()).diff((0, dayjs_1.default)(admin.latestLogin), 'minute') < 30 && admin.loginTryCount > +process.env.ALLOWED_LOGIN_COUNT) {
            return (0, functions_1.writeJsonRes)(res, 400, null, `Try again after ${(0, dayjs_1.default)(admin.latestLogin).diff((0, dayjs_1.default)(new Date()))} minutes!`);
        }
        const isVerifiedPassword = yield (0, functions_1.verifyPassword)(req.body.password, admin.password);
        if (!isVerifiedPassword) {
            yield (0, functions_1.updateAdminLoginCount)(admin);
            return (0, functions_1.writeJsonRes)(res, 400, null, "Invalid password!");
        }
        const tokenData = {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            roleId: admin.roleId
        };
        return (0, functions_1.writeJsonRes)(res, 200, {
            // @ts-ignore
            token: (0, functions_1.getJwtToken)(tokenData, process.env.JWT_USER_SECRET)
        }, "Successfully logged in!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Create Admin Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.login = login;
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const duplicatedEmail = yield prisma.admins.findFirst({
            where: {
                email: req.body.email
            }
        });
        if (duplicatedEmail) {
            return (0, functions_1.writeJsonRes)(res, 409, null, "This email is already used!");
        }
        const hashedPassword = yield (0, functions_1.hashPassword)(req.body.password);
        const createdAdmin = yield prisma.admins.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                roleId: req.body.roleId,
            }
        });
        return (0, functions_1.writeJsonRes)(res, 201, {
            id: createdAdmin.id,
            name: createdAdmin.name,
            email: createdAdmin.email,
            createdAt: createdAdmin.createdAt,
            updatedAt: createdAdmin.updatedAt
        }, "Successfully created!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Create Admin Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.createAdmin = createAdmin;
const inviteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield prisma.admins.findFirst({
            where: {
                email: req.body.email
            }
        });
        if (!admin) {
            return (0, functions_1.writeJsonRes)(res, 404, null, "User not found!");
        }
        if (admin.hasLogin) {
            return (0, functions_1.writeJsonRes)(res, 400, null, "This user has already been an admin!");
        }
        (0, nodeMailerFn_1.default)({ to: req.body.email, subject: "Invitation!", html: 'invitation template' });
        return (0, functions_1.writeJsonRes)(res, 200, null, "Successfully sent invitation!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Invite Admin Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.inviteAdmin = inviteAdmin;
const checkEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield prisma.admins.findFirst({
            where: {
                email: req.body.email
            }
        });
        if (!admin) {
            return (0, functions_1.writeJsonRes)(res, 404, null, "This email hasn't been registered yet!");
        }
        return (0, functions_1.writeJsonRes)(res, 200, null, "Verify your email!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Check Email Admin Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.checkEmail = checkEmail;
const verfiyCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield prisma.admins.findFirst({
            where: {
                email: req.body.email
            }
        });
        if ((admin === null || admin === void 0 ? void 0 : admin.verificationCode) !== req.body.verificationCode) {
            return (0, functions_1.writeJsonRes)(res, 400, null, "Invalid verification code");
        }
        const tokenData = {
            verificationCode: req.body.verificationCode,
            email: admin === null || admin === void 0 ? void 0 : admin.email,
            adminResetPasswordToken: true
        };
        return (0, functions_1.writeJsonRes)(res, 200, {
            // @ts-ignore
            token: (0, functions_1.getJwtToken)(tokenData, process.env.JWT_USER_SECRET)
        }, "Successfully verified!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Verify Code Admin Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.verfiyCode = verfiyCode;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield (0, functions_1.hashPassword)(req.body.newPassword);
        yield prisma.admins.update({
            where: {
                email: req.body.email
            },
            data: {
                password: hashedPassword
            }
        });
        return (0, functions_1.writeJsonRes)(res, 200, null, 'Successfully changed your password!');
    }
    catch (error) {
        (0, functions_1.logError)(error, "Reset Password Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.resetPassword = resetPassword;
