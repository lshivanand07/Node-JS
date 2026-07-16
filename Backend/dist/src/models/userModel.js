"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneUser = exports.updateOneUser = exports.insertOneUser = exports.getUserInfo = exports.getOneUserByUserId = exports.getAllUser = void 0;
const dbConnection_1 = require("../../config/dbConnection");
const getAllUser = async () => {
    const [rows] = await dbConnection_1.db.query("select * from users");
    return rows;
};
exports.getAllUser = getAllUser;
const getOneUserByUserId = async (userID) => {
    const [rows] = await dbConnection_1.db.query("select * from users where user_id = ?", [userID]);
    return rows;
};
exports.getOneUserByUserId = getOneUserByUserId;
const getUserInfo = async (userID) => {
    const [rows] = await dbConnection_1.db.query("select * from users where user_id = ?", [userID]);
    return rows;
};
exports.getUserInfo = getUserInfo;
const insertOneUser = async (userData) => {
    const keys = Object.keys(userData).join(", ");
    const values = Object.values(userData);
    const placeholders = values.map(() => '?').join(", ");
    const query = `insert into users ( ${keys} ) values ( ${placeholders} )`;
    const [result] = await dbConnection_1.db.query(query, values);
    return result;
};
exports.insertOneUser = insertOneUser;
const updateOneUser = async (userID, userData) => {
    const userDataKeys = Object.keys(userData)
        .map((keys) => `${keys} = ?`)
        .join(", ");
    const userDataValues = Object.values(userData);
    const query = `update users set ${userDataKeys} where user_id = ?`;
    const [result] = await dbConnection_1.db.query(query, [...userDataValues, userID]);
    return result;
};
exports.updateOneUser = updateOneUser;
const deleteOneUser = async (userID) => {
    // [row] = [result, fields]
    //  row  =  result = row[0] , fields = row[1]
    const [result] = await dbConnection_1.db.query("delete from users where user_id = ?", [userID]);
    return result;
};
exports.deleteOneUser = deleteOneUser;
//# sourceMappingURL=userModel.js.map