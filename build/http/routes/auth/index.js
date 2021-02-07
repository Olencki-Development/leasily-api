"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_1 = require("./register");
const login_1 = require("./login");
const verify_1 = require("./verify");
const router = express_1.Router();
router.use('/register', register_1.default);
router.use('/login', login_1.default);
router.use('/verify', verify_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map