"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
        succcess: data === null || data === void 0 ? void 0 : data.success,
        message: data === null || data === void 0 ? void 0 : data.message,
        data: data === null || data === void 0 ? void 0 : data.data,
        statusCode: data === null || data === void 0 ? void 0 : data.statusCode
    });
};
exports.default = sendResponse;
