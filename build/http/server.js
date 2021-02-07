"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
const errorHandler_1 = require("./errorHandler");
const app = express();
exports.app = app;
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use('/api', routes_1.default);
app.use(errorHandler_1.default);
//# sourceMappingURL=server.js.map