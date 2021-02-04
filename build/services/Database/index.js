"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
class Database {
    constructor(uri) {
        this.uri = uri;
    }
    static parseUri(options) {
        let uri = `${options.address}/${options.name}`;
        if (options.username && options.password) {
            uri = `${options.username}:${options.password}@${uri}?authSource=admin`;
        }
        return `mongodb://${uri}`;
    }
    connect() {
        const self = this;
        return new Promise(function (resolve) {
            if (self.database) {
                return resolve();
            }
            Mongoose.connect(self.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            });
            self.database = Mongoose.connection;
            self.database.once('open', async () => {
                console.log('Connected to database');
                resolve();
            });
            self.database.on('error', console.error.bind(console, 'An with the database has occured: '));
        });
    }
    disconnect() {
        Mongoose.disconnect();
    }
}
exports.default = Database;
//# sourceMappingURL=index.js.map