"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./http/server");
const port = process.env.PORT || 8000;
server_1.app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server_1.server.graphqlPath}`));
//# sourceMappingURL=index.js.map