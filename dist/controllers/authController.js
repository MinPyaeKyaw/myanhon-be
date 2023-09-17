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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokens = exports.resetPassword = exports.verifyResetOTPCode = exports.verifyOTPCode = exports.signup = exports.login = exports.sendOTP = exports.refreshToken = exports.test = void 0;
const client_1 = require("@prisma/client");
const functions_1 = require("../utils/functions");
const enums_1 = require("../utils/enums");
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
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.users.findFirst({
            where: { id: req.body.id },
        });
        const accessTokenData = {
            id: user === null || user === void 0 ? void 0 : user.id,
            name: user === null || user === void 0 ? void 0 : user.name,
            email: user === null || user === void 0 ? void 0 : user.email,
            phone: user === null || user === void 0 ? void 0 : user.phone,
            isPaid: user === null || user === void 0 ? void 0 : user.isPaid,
            startDate: user === null || user === void 0 ? void 0 : user.startDate,
            expiredDate: user === null || user === void 0 ? void 0 : user.expiredDate,
        };
        return (0, functions_1.writeJsonRes)(res, 200, {
            accessToken: (0, functions_1.getJwtToken)(accessTokenData, enums_1.JWT_TYPES.ACCESS),
        }, 'Successfully refreshed the token!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Refresh token Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.refreshToken = refreshToken;
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.users.findFirst({
            where: {
                phone: req.body.phone,
            },
        });
        if (!user) {
            return (0, functions_1.writeJsonRes)(res, 404, null, "This phone number hasn't been registered yet!");
        }
        // send otp to user via SMS message
        const otpCode = (0, functions_1.generateOTPCode)();
        const hashedOtp = yield (0, functions_1.hashString)(otpCode);
        yield (0, functions_1.refreshOTPCode)(req.body.phone, hashedOtp);
        console.log('RESEND send otp to user via SMS message' + otpCode);
        const tokenData = {
            id: user.id,
        };
        return (0, functions_1.writeJsonRes)(res, 200, {
            otpToken: (0, functions_1.getJwtToken)(tokenData, enums_1.JWT_TYPES.OTP),
        }, 'Successfully sent the OTP code!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Resend OTP Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.sendOTP = sendOTP;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.users.findFirst({
            where: {
                phone: req.body.phone,
            },
        });
        if (!user) {
            return (0, functions_1.writeJsonRes)(res, 404, null, "This phone number hasn't been registered yet!");
        }
        const isVerifiedPassword = yield (0, functions_1.verifyString)(req.body.password, user.password);
        if (!isVerifiedPassword) {
            return (0, functions_1.writeJsonRes)(res, 400, null, 'Invalid password!');
        }
        // send otp to user via SMS message
        const otpCode = (0, functions_1.generateOTPCode)();
        const hashedOtp = yield (0, functions_1.hashString)(otpCode);
        yield (0, functions_1.refreshOTPCode)(req.body.phone, hashedOtp);
        console.log('send otp to user via SMS message' + otpCode);
        const tokenData = {
            id: user.id,
        };
        return (0, functions_1.writeJsonRes)(res, 200, {
            otpToken: (0, functions_1.getJwtToken)(tokenData, enums_1.JWT_TYPES.OTP),
        }, 'Successfully logged in!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Login Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const duplicatedPhone = yield prisma.users.findFirst({
            where: {
                phone: req.body.phone,
            },
        });
        if (duplicatedPhone) {
            return (0, functions_1.writeJsonRes)(res, 409, null, 'This phone number is already used!');
        }
        const otpCode = (0, functions_1.generateOTPCode)();
        const hashedOtp = yield (0, functions_1.hashString)(otpCode);
        const hashedPassword = yield (0, functions_1.hashString)(req.body.password);
        const createdUser = yield prisma.users.create({
            data: {
                name: (0, functions_1.getUsernameFromEmail)(req.body.email),
                email: req.body.email,
                phone: req.body.phone,
                password: hashedPassword,
                otpCode: hashedOtp,
            },
        });
        // send otp to user via SMS message
        console.log('SIGN UP send otp to user via SMS message' + otpCode);
        const tokenData = {
            id: createdUser.id,
        };
        return (0, functions_1.writeJsonRes)(res, 201, {
            otpToken: (0, functions_1.getJwtToken)(tokenData, enums_1.JWT_TYPES.OTP),
        }, 'Successfully created your account!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Sign Up Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.signup = signup;
const verifyOTPCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield prisma.users.findFirst({
            where: {
                phone: req.body.phone,
            },
        });
        if (!user) {
            return (0, functions_1.writeJsonRes)(res, 400, null, 'Invalid OTP code!');
        }
        const isVerifiedOTP = yield (0, functions_1.verifyString)((_a = req.body) === null || _a === void 0 ? void 0 : _a.otpCode, user === null || user === void 0 ? void 0 : user.otpCode);
        if (!isVerifiedOTP) {
            return (0, functions_1.writeJsonRes)(res, 400, null, 'Invalid OTP code!');
        }
        const otpCode = (0, functions_1.generateOTPCode)();
        const hashedOtp = yield (0, functions_1.hashString)(otpCode);
        yield (0, functions_1.refreshOTPCode)(req.body.phone, hashedOtp);
        const tokenData = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isPaid: user.isPaid,
            startDate: user.startDate,
            expiredDate: user.expiredDate,
        };
        const refreshTokenData = {
            id: user.id,
        };
        return (0, functions_1.writeJsonRes)(res, 200, {
            accessToken: (0, functions_1.getJwtToken)(tokenData, enums_1.JWT_TYPES.ACCESS),
            refreshToken: (0, functions_1.getJwtToken)(refreshTokenData, enums_1.JWT_TYPES.REFRESH),
        }, 'Successfully verified the OTP code!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Verify OTP Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.verifyOTPCode = verifyOTPCode;
const verifyResetOTPCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const user = yield prisma.users.findFirst({
            where: {
                phone: req.body.phone,
            },
        });
        if (!user) {
            return (0, functions_1.writeJsonRes)(res, 400, null, 'Invalid OTP code!');
        }
        const isVerifiedOTP = yield (0, functions_1.verifyString)((_b = req.body) === null || _b === void 0 ? void 0 : _b.otpCode, user === null || user === void 0 ? void 0 : user.otpCode);
        if (!isVerifiedOTP) {
            return (0, functions_1.writeJsonRes)(res, 400, null, 'Invalid OTP code!');
        }
        const otpCode = (0, functions_1.generateOTPCode)();
        const hashedOtp = yield (0, functions_1.hashString)(otpCode);
        yield (0, functions_1.refreshOTPCode)(req.body.phone, hashedOtp);
        const tokenData = {
            id: user.id,
        };
        return (0, functions_1.writeJsonRes)(res, 200, {
            resetToken: (0, functions_1.getJwtToken)(tokenData, enums_1.JWT_TYPES.RESET_PASSWORD),
        }, 'Successfully verified the OTP code!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Verify Reset OTP Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.verifyResetOTPCode = verifyResetOTPCode;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield (0, functions_1.hashString)(req.body.newPassword);
        yield prisma.users.update({
            where: {
                phone: req.body.phone,
            },
            data: {
                password: hashedPassword,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 200, null, 'Successfully changed your password!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Reset Password Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.resetPassword = resetPassword;
const getTokens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.users.findFirst({
            where: {
                id: req.body.userId,
            },
        });
        const tokenData = {
            id: user === null || user === void 0 ? void 0 : user.id,
            name: user === null || user === void 0 ? void 0 : user.name,
            email: user === null || user === void 0 ? void 0 : user.email,
            phone: user === null || user === void 0 ? void 0 : user.phone,
            isPaid: user === null || user === void 0 ? void 0 : user.isPaid,
            startDate: user === null || user === void 0 ? void 0 : user.startDate,
            expiredDate: user === null || user === void 0 ? void 0 : user.expiredDate,
        };
        const refreshTokenData = {
            id: user === null || user === void 0 ? void 0 : user.id,
        };
        return (0, functions_1.writeJsonRes)(res, 200, {
            accessToken: (0, functions_1.getJwtToken)(tokenData, enums_1.JWT_TYPES.ACCESS),
            refreshToken: (0, functions_1.getJwtToken)(refreshTokenData, enums_1.JWT_TYPES.REFRESH),
        }, 'Successfully verified the OTP code!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Verify OTP Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.getTokens = getTokens;
