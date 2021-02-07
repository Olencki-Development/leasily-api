"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./auth");
const router = express_1.Router();
router.use('/auth', auth_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map