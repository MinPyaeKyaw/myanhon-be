"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = (status, data, message) => {
    return {
        status,
        data,
        message,
    };
};
exports.response = response;
// export const pagination = <T>(data: T): Pagination<T> => {
//     return {
//     }
// }
