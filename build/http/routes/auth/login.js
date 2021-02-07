"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../../../container");
const Auth_1 = require("../../../services/Auth");
const validate_1 = require("../../../services/Auth/validate");
const result_1 = require("../../../transformers/result");
const router = express_1.Router();
router.post('/', async function (req, res, next) {
    try {
        const form = validate_1.login(req.body);
        const auth = container_1.default.make(Auth_1.default);
        await auth.login(form);
        res.json(result_1.default('Verification token sent.'));
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;
//# sourceMappingURL=login.js.map