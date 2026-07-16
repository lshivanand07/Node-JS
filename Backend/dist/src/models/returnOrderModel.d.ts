import { ResultSetHeader } from 'mysql2/promise';
declare const fetchReturnStatus: (orderID: number) => Promise<import("mysql2/promise").QueryResult>;
declare const fetchRefundStatus: (orderID: number) => Promise<import("mysql2/promise").QueryResult>;
declare const insertReturnOrders: (returnOrderData: Record<string, unknown>) => Promise<import("mysql2/promise").QueryResult>;
declare const updateReturnOrder: (orderID: number, returnOrderData: Record<string, unknown>) => Promise<{
    returnStatusResult: ResultSetHeader;
    refundResult: ResultSetHeader | null;
}>;
declare const updateRefunds: (orderID: number, refundData: Record<string, unknown>) => Promise<{
    result: ResultSetHeader;
    refundResult: import("mysql2/promise").QueryResult | null;
} | null>;
export { fetchReturnStatus, fetchRefundStatus, insertReturnOrders, updateReturnOrder, updateRefunds };
//# sourceMappingURL=returnOrderModel.d.ts.map