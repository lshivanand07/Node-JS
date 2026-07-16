import { ResultSetHeader } from 'mysql2';
declare const fetchAllOrders: () => Promise<import("mysql2").QueryResult>;
declare const fetchOrdersByUserId: (userID: number) => Promise<import("mysql2").QueryResult>;
declare const fetchOrderByOrderId: (orderID: number) => Promise<import("mysql2").QueryResult>;
declare const fetchOrdersByOrderStatus: (orderStatus: string) => Promise<import("mysql2").QueryResult>;
declare const individualProductOrder: (productID: number) => Promise<import("mysql2").QueryResult>;
declare const updateOrdersByUserId: (userID: number, orderId: number, ordersData: Record<string, unknown>) => Promise<ResultSetHeader>;
export { fetchAllOrders, fetchOrdersByOrderStatus, fetchOrdersByUserId, fetchOrderByOrderId, individualProductOrder, updateOrdersByUserId };
//# sourceMappingURL=ordersModel.d.ts.map