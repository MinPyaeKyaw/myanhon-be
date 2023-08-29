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
exports.calculatePercentage = exports.encryptPaymentPayload = exports.uploadFile = exports.updateAdminLoginCount = exports.getConnectedRedisClient = exports.getJwtTokenFromReq = exports.getJwtToken = exports.verifyPassword = exports.hashPassword = exports.refreshVerificationCode = exports.generateOTPCode = exports.writeJsonRes = exports.logError = exports.zipAndDelFile = exports.getFileSize = exports.zipFile = void 0;
const fs_1 = __importDefault(require("fs"));
const zlib_1 = __importDefault(require("zlib"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dayjs_1 = __importDefault(require("dayjs"));
const redis_1 = require("redis");
const multer_1 = __importDefault(require("multer"));
const node_rsa_1 = __importDefault(require("node-rsa"));
const enums_1 = require("./enums");
const prisma = new client_1.PrismaClient();
const zipFile = (filePath) => {
    const splitedFilePath = filePath.split('/');
    let parentFolder = '';
    splitedFilePath.forEach((folder) => {
        if (folder !== splitedFilePath[splitedFilePath.length - 1]) {
            parentFolder = parentFolder + folder + '/';
        }
    });
    const zipFilename = `${parentFolder}${(0, dayjs_1.default)(new Date()).format('DD-MM-YYYY-h-m-s')}.zip`;
    const readStream = fs_1.default.createReadStream(filePath);
    const writeStream = fs_1.default.createWriteStream(zipFilename);
    const zip = zlib_1.default.createGzip();
    return readStream.pipe(zip).pipe(writeStream);
};
exports.zipFile = zipFile;
const getFileSize = (filePath, unit) => __awaiter(void 0, void 0, void 0, function* () {
    const stats = yield fs_1.default.promises.stat(filePath);
    if (unit === 'kb') {
        return stats.size / 1024;
    }
    if (unit === 'mb') {
        return stats.size / (1024 * 1024);
    }
    if (unit === 'gb') {
        return stats.size / (1024 * 1024 * 1024);
    }
    return stats.size;
});
exports.getFileSize = getFileSize;
const zipAndDelFile = (filePath) => {
    (0, exports.getFileSize)(filePath, 'kb').then(result => {
        if (result > 500) {
            (0, exports.zipFile)(filePath).on('finish', () => {
                fs_1.default.unlink(filePath, err => {
                    if (err) {
                        console.log('delete error file', err);
                    }
                });
            });
        }
    });
};
exports.zipAndDelFile = zipAndDelFile;
const logError = (err, label) => {
    console.log(label, err);
    const format = `${new Date()}[ ${label} ]\n${err.stack}\n\n`;
    // const format = new Date() + '[ ' + label + ' ]' + '\n' + err.stack + '\n \n'
    // @ts-expect-error
    if (!fs_1.default.existsSync(process.env.LOGGER_FILE)) {
        if (err instanceof Error) {
            // @ts-expect-error
            fs_1.default.writeFile(process.env.LOGGER_FILE, format, error => {
                if (error) {
                    console.log('create error file', error);
                }
                // @ts-expect-error
                (0, exports.zipAndDelFile)(process.env.LOGGER_FILE);
            });
        }
    }
    else {
        if (err instanceof Error) {
            // @ts-expect-error
            fs_1.default.appendFile(process.env.LOGGER_FILE, format, error => {
                if (error) {
                    console.log('append error', error);
                }
                // @ts-expect-error
                (0, exports.zipAndDelFile)(process.env.LOGGER_FILE);
            });
        }
    }
};
exports.logError = logError;
const writeJsonRes = (res, status, data, message) => {
    return res
        .status(status)
        .json({
        status,
        message,
        data,
    })
        .end();
};
exports.writeJsonRes = writeJsonRes;
const generateOTPCode = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result.toUpperCase();
};
exports.generateOTPCode = generateOTPCode;
const refreshVerificationCode = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCode = (0, exports.generateOTPCode)();
        const updateCode = yield prisma.users.update({
            where: {
                email,
            },
            data: {
                verificationCode: newCode,
            },
        });
        if (updateCode) {
            return true;
        }
    }
    catch (error) {
        return false;
    }
});
exports.refreshVerificationCode = refreshVerificationCode;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, 10);
});
exports.hashPassword = hashPassword;
const verifyPassword = (userPassword, dbPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default
        .compare(userPassword, dbPassword)
        .then(res => {
        return res;
    })
        .catch(() => {
        return false;
    });
});
exports.verifyPassword = verifyPassword;
const getJwtToken = (data, type) => {
    let exp, hehe;
    if (type === enums_1.JWT_TYPES.ACCESS) {
        exp = process.env.JWT_USER_EXP;
        hehe = process.env.JWT_USER_SECRET;
    }
    else if (type === enums_1.JWT_TYPES.REFRESH) {
        exp = process.env.JWT_USER_EXP;
        hehe = process.env.JWT_REFRESH_SECRET;
    }
    else {
        exp = process.env.JWT_USER_EXP;
        hehe = process.env.JWT_RESET_PASSWORD_SECRET;
    }
    // @ts-expect-error
    const token = jsonwebtoken_1.default.sign(data, hehe, {
        expiresIn: exp,
    });
    return token;
};
exports.getJwtToken = getJwtToken;
const getJwtTokenFromReq = (authHeader) => {
    if (!authHeader) {
        return false;
    }
    return authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
};
exports.getJwtTokenFromReq = getJwtTokenFromReq;
const getConnectedRedisClient = () => __awaiter(void 0, void 0, void 0, function* () {
    const redisClient = (0, redis_1.createClient)();
    redisClient.on('error', err => {
        console.log('Redis Client Error', err);
    });
    yield redisClient.connect();
    return redisClient;
});
exports.getConnectedRedisClient = getConnectedRedisClient;
const updateAdminLoginCount = (admin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-expect-error
        if (admin.loginTryCount < +process.env.ALLOWED_LOGIN_COUNT) {
            yield prisma.admins.update({
                where: {
                    email: admin.email,
                },
                data: {
                    loginTryCount: admin.loginTryCount + 1,
                },
            });
        }
        else {
            yield prisma.admins.update({
                where: {
                    email: admin.email,
                },
                data: {
                    loginTryCount: 0,
                    latestLogin: new Date(),
                },
            });
        }
        return true;
    }
    catch (error) {
        (0, exports.logError)(error, 'Admin Update Count');
        return false;
    }
});
exports.updateAdminLoginCount = updateAdminLoginCount;
const uploadFile = () => {
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            console.log('lee', file);
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        },
    });
    const upload = (0, multer_1.default)({ storage });
    return upload;
};
exports.uploadFile = uploadFile;
const encryptPaymentPayload = (paymentPayload) => {
    // Encrypt payload
    const publicKey = new node_rsa_1.default();
    // @ts-expect-error
    publicKey.importKey(process.env.PAYMENT_PUBLIC_KEY, 'pkcs8-public');
    publicKey.setOptions({ encryptionScheme: 'pkcs1' });
    const encrytpStr = publicKey.encrypt(paymentPayload, 'base64');
    const param = { payload: encrytpStr };
    const payloadData = new URLSearchParams(param);
    const data = payloadData.get('payload');
    return data;
};
exports.encryptPaymentPayload = encryptPaymentPayload;
const calculatePercentage = (targetedValue, totalBaseValue) => {
    return (targetedValue / totalBaseValue) * 100;
};
exports.calculatePercentage = calculatePercentage;
