"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toJson(entity) {
    return {
        id: entity.user.id,
        fullName: entity.user.fullName,
        email: entity.user.email,
        phone: entity.user.phone,
        createdAt: entity.user.createdAt.toISOString(),
        updatedAt: entity.user.updatedAt.toISOString()
    };
}
exports.default = toJson;
//# sourceMappingURL=user.js.map