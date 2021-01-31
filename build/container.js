"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_container_1 = require("@halliganjs/service-container");
const models_1 = require("./providers/models");
const container = new service_container_1.Container();
container.provider(models_1.default);
exports.default = container;
//# sourceMappingURL=container.js.map