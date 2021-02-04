"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_container_1 = require("@halliganjs/service-container");
const models_1 = require("./providers/models");
const mail_1 = require("./providers/mail");
const rentprep_1 = require("./providers/rentprep");
const verify_1 = require("./providers/verify");
const auth_1 = require("./providers/auth");
const db_1 = require("./providers/db");
const container = new service_container_1.Container();
container
    .provider(models_1.default)
    .provider(mail_1.default)
    .provider(rentprep_1.default)
    .provider(verify_1.default)
    .provider(auth_1.default)
    .provider(db_1.default);
exports.default = container;
//# sourceMappingURL=container.js.map