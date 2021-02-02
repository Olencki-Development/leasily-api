"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function findOneOrCreate(schema) {
    schema.statics.findOneOrCreate = async function (filter, document) {
        const self = this;
        const item = await self.findOne(filter);
        if (item) {
            return item;
        }
        return self.create(document);
    };
}
exports.default = findOneOrCreate;
//# sourceMappingURL=findOneOrCreate.js.map