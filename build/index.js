"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const server_1 = require("./http/server");
const container_1 = require("./container");
const Database_1 = require("./services/Database");
dotenv.config();
const port = process.env.PORT || 8000;
server_1.app.listen({ port }, async () => {
    await container_1.default.make(Database_1.default);
    console.log(`🚀 Server ready at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map