"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const express = require("express");
const resolvers_1 = require("./resolvers");
const typeDefs_1 = require("./typeDefs");
const container_1 = require("../container");
const Auth_1 = require("../services/Auth");
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
    context: async ({ req }) => {
        const token = req.headers.authorization || '';
        if (token) {
            const auth = container_1.default.make(Auth_1.default);
            const user = auth.validate({
                token
            });
            return {
                user
            };
        }
        else {
            return {
                user: null
            };
        }
    }
});
exports.server = server;
const app = express();
exports.app = app;
server.applyMiddleware({
    app
});
//# sourceMappingURL=server.js.map