import { ResultSetHeader } from 'mysql2/promise';
declare const fetchAllAddress: () => Promise<import("mysql2/promise").QueryResult>;
declare const fetchOneAddressByUserId: (userID: number) => Promise<import("mysql2/promise").QueryResult>;
declare const insertOneAddress: (userID: number, addressData: any) => Promise<{
    addressTableResult: ResultSetHeader;
    userAddressTableResult: import("mysql2/promise").QueryResult;
}>;
declare const updateUserAddressByUserId: (userID: number, userAddressStatus: string, addressData: Record<string, unknown>) => Promise<ResultSetHeader>;
declare const deleteOneAddressByUserId: (userID: number, userAddressStatus: string) => Promise<ResultSetHeader>;
export { fetchAllAddress, fetchOneAddressByUserId, insertOneAddress, updateUserAddressByUserId, deleteOneAddressByUserId };
//# sourceMappingURL=addressModel.d.ts.map