"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../../../container");
const Auth_1 = require("../../../services/Auth");
const validate_1 = require("../../../services/Auth/validate");
const user_1 = require("../../../transformers/user");
const router = express_1.Router();
router.post('/', async function (req, res, next) {
    try {
        const form = validate_1.verify(req.body);
        const auth = container_1.default.make(Auth_1.default);
        const { user, token } = await auth.verify(form);
        res.json({
            user: user_1.default({
                user
            }),
            token
        });
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;
//# sourceMappingURL=verify.js.map