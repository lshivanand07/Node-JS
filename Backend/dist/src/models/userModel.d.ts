import { ResultSetHeader } from 'mysql2/promise';
declare const getAllUser: () => Promise<import("mysql2/promise").QueryResult>;
declare const getOneUserByUserId: (userID: number) => Promise<import("mysql2/promise").QueryResult>;
declare const getUserInfo: (userID: number) => Promise<import("mysql2/promise").QueryResult>;
declare const insertOneUser: (userData: object) => Promise<import("mysql2/promise").QueryResult>;
declare const updateOneUser: (userID: number, userData: object) => Promise<ResultSetHeader>;
declare const deleteOneUser: (userID: number) => Promise<ResultSetHeader>;
export { getAllUser, getOneUserByUserId, getUserInfo, insertOneUser, updateOneUser, deleteOneUser };
//# sourceMappingURL=userModel.d.ts.map