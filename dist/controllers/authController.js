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
exports.resetPassword = exports.verifyCode = exports.checkEmail = exports.verifyEmail = exports.signup = exports.login = exports.test = void 0;
const client_1 = require("@prisma/client");
const functions_1 = require("../utils/functions");
const nodeMailerFn_1 = __importDefault(require("../utils/nodeMailerFn"));
const prisma = new client_1.PrismaClient();
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //     const user = await prisma.users.findFirst({
    //         where: {
    //             email: req.body.email
    //         }
    //     })
    //     console.log('USER', user);
    //     if(!user) {
    //         console.log('NOT FOUND USER', user);
    //         return writeJsonRes<null>(res, 404, null, "This email hasn't been registered yet!");
    //     }
    //     let lee = await verifyPassword(req.body.password, user.password)
    //     return writeJsonRes<any>(res, 404, {lee: lee}, "This email hasn't been registered yet!");
    // } catch (error) {
    //     console.log("LEE PL", error)
    //     return writeJsonRes<null>(res, 500, null, "Internal Server Error!")
    // }
    // logger();
});
exports.test = test;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.users.findFirst({
            where: {
                email: req.body.email
            }
        });
        if (!user) {
            return (0, functions_1.writeJsonRes)(res, 404, null, "This email hasn't been registered yet!");
        }
        const isVerifiedPassword = yield (0, functions_1.verifyPassword)(req.body.password, user.password);
        if (!isVerifiedPassword) {
            return (0, functions_1.writeJsonRes)(res, 400, null, "Invalid password!");
        }
        if (user.isEmailVerified === false) {
            const otpCode = (0, functions_1.generateOTPCode)();
            (0, nodeMailerFn_1.default)({ to: req.body.email, subject: "Verify your email!", html: otpCode });
            return (0, functions_1.writeJsonRes)(res, 400, null, "Verify your email!");
        }
        const tokenData = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isPaid: user.isPaid,
            startDate: user.startDate,
            expiredDate: user.expiredDate
        };
        return (0, functions_1.writeJsonRes)(res, 200, {
            // @ts-ignore
            token: (0, functions_1.getJwtToken)(tokenData, process.env.JWT_USER_SECRET)
        }, "Successfully logged in!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Login Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const duplicatedEmail = yield prisma.users.findFirst({
            where: {
                email: req.body.email
            }
        });
        if (duplicatedEmail) {
            return (0, functions_1.writeJsonRes)(res, 409, null, "This email is already used!");
        }
        const otpCode = (0, functions_1.generateOTPCode)();
        const hashedPassword = yield (0, functions_1.hashPassword)(req.body.password);
        const createdUser = yield prisma.users.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: hashedPassword,
                verificationCode: otpCode
            }
        });
        if (createdUser) {
            (0, nodeMailerFn_1.default)({ to: req.body.email, subject: "Verify your email!", html: otpCode });
        }
        return (0, functions_1.writeJsonRes)(res, 201, null, "Successfully created your account!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Sign Up Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.signup = signup;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield prisma.users.findFirst({
            where: {
                email: req.body.email
            }
        });
        if (!user) {
            return (0, functions_1.writeJsonRes)(res, 400, null, "This email hasn't been registered yet!");
        }
        if (((_a = req.body) === null || _a === void 0 ? void 0 : _a.verificationCode) !== (user === null || user === void 0 ? void 0 : user.verificationCode)) {
            return (0, functions_1.writeJsonRes)(res, 400, null, 'Invalid verification code');
        }
        yield prisma.users.update({
            where: {
                email: req.body.email
            },
            data: {
                isEmailVerified: true
            }
        });
        yield (0, functions_1.refreshVerificationCode)(req.body.email);
        const tokenData = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isPaid: user.isPaid,
            startDate: user.startDate,
            expiredDate: user.expiredDate
        };
        return (0, functions_1.writeJsonRes)(res, 200, {
            // @ts-ignore
            token: (0, functions_1.getJwtToken)(tokenData, process.env.JWT_USER_SECRET)
        }, "Successfully verified your email!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Email Verify Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.verifyEmail = verifyEmail;
const checkEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.users.findFirst({
            where: {
                email: req.body.email
            }
        });
        if (!user) {
            return (0, functions_1.writeJsonRes)(res, 404, null, "This email hasn't been registered yet!");
        }
        return (0, functions_1.writeJsonRes)(res, 200, null, "Verify your email!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Check Email Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.checkEmail = checkEmail;
const verifyCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.users.findFirst({
            where: {
                email: req.body.email
            }
        });
        if ((user === null || user === void 0 ? void 0 : user.verificationCode) !== req.body.verificationCode) {
            return (0, functions_1.writeJsonRes)(res, 400, null, "Invalid verification code");
        }
        yield (0, functions_1.refreshVerificationCode)(req.body.email);
        const tokenData = {
            email: req.body.email,
            code: req.body.verificationCode,
            resetPasswordToken: true
        };
        // @ts-ignore
        return (0, functions_1.writeJsonRes)(res, 200, { token: (0, functions_1.getJwtToken)(tokenData, process.env.JWT_RESET_PASSWORD_SECRET) }, "Successfully verified!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Verfiy Code Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.verifyCode = verifyCode;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield (0, functions_1.hashPassword)(req.body.newPassword);
        yield prisma.users.update({
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
