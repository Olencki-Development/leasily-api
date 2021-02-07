"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
const LeasilyError_1 = require("../errors/LeasilyError");
function errorHandler(err, req, res, next) {
    if (err instanceof joi_1.ValidationError) {
        return res.status(400).json({
            statusCode: 400,
            message: err.message
        });
    }
    if (err instanceof LeasilyError_1.default) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message
        });
    }
    console.error(err);
    return res.status(500).json({
        statusCode: 500,
        message: 'An internal server error has occured.'
    });
}
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map