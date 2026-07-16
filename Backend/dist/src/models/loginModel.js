"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserLoginCredential = void 0;
const dbConnection_1 = require("../../config/dbConnection");
const getUserLoginCredential = async (email) => {
    const [rows] = await dbConnection_1.db.query('select * from users where email = ?', [email]);
    return rows;
};
exports.getUserLoginCredential = getUserLoginCredential;
//# sourceMappingURL=loginModel.js.map