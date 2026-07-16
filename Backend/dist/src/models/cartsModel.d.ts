import { ResultSetHeader } from 'mysql2/promise';
declare const fetchOneUserCartsByUserId: (userID: number) => Promise<import("mysql2/promise").QueryResult>;
declare const createUserCart: (userID: number, cartData: any) => Promise<void>;
declare const updateCart: (productVariantID: number, cartData: any, userID: number) => Promise<ResultSetHeader>;
declare const deleteUserCartByUserId: (userID: number, productID: number, variantID: number) => Promise<ResultSetHeader>;
export { fetchOneUserCartsByUserId, createUserCart, updateCart, deleteUserCartByUserId };
//# sourceMappingURL=cartsModel.d.ts.map