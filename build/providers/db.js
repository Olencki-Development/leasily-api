"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../services/Database");
function default_1(container) {
    container.singleton(Database_1.default, async () => {
        const address = process.env.DB_ADDRESS;
        if (!address) {
            throw new Error('DB_ADDRESS is not set');
        }
        const name = process.env.DB_NAME;
        if (!name) {
            throw new Error('DB_ADDRESS is not set');
        }
        const uri = Database_1.default.parseUri({
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            address,
            name,
        });
        const db = new Database_1.default(uri);
        await db.connect();
        return db;
    });
}
exports.default = default_1;
//# sourceMappingURL=db.js.map