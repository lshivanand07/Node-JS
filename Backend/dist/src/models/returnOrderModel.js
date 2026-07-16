"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRefunds = exports.updateReturnOrder = exports.insertReturnOrders = exports.fetchRefundStatus = exports.fetchReturnStatus = void 0;
const dbConnection_1 = require("../../config/dbConnection");
const fetchReturnStatus = async (orderID) => {
    const query = `select returns.* from returns inner join order_items
        on returns.order_item_id = order_items.order_item_id
       where order_id = ?`;
    const [rows] = await dbConnection_1.db.query(query, [orderID]);
    return rows;
};
exports.fetchReturnStatus = fetchReturnStatus;
const fetchRefundStatus = async (orderID) => {
    const query = `select refunds.* from refunds 
inner join returns
on refunds.return_id = returns.return_id
inner join order_items
	on returns.order_item_id = order_items.order_item_id
       where order_id = ?`;
    const [rows] = await dbConnection_1.db.query(query, [orderID]);
    return rows;
};
exports.fetchRefundStatus = fetchRefundStatus;
const insertReturnOrders = async (returnOrderData) => {
    const orderId = returnOrderData.orderId;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [orderItemIdArray] = await dbConnection_1.db.query("select order_item_id from order_items where order_id = ?", [orderId]);
    const orderItemId = orderItemIdArray[0].order_item_id;
    const returnTableFields = {
        reason: returnOrderData.reason,
        order_item_id: orderItemId
    };
    const returnTableKeys = Object.keys(returnTableFields).join(',');
    const returnTableValues = Object.values(returnTableFields);
    const returnTablePlaceholder = returnTableValues.map(() => '?').join(',');
    const returnTableQuery = `insert into returns (${returnTableKeys}) value (${returnTablePlaceholder})`;
    const [result] = await dbConnection_1.db.query(returnTableQuery, [...returnTableValues]);
    return result;
};
exports.insertReturnOrders = insertReturnOrders;
const updateReturnOrder = async (orderID, returnOrderData) => {
    const return_status = returnOrderData.return_status;
    const [returnStatusResult] = await dbConnection_1.db.query(`UPDATE returns INNER JOIN order_items
                       ON returns.order_item_id = order_items.order_item_id  
                       SET returns.return_status = ? 
                        WHERE order_items.order_id = ? `, [return_status, orderID]);
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [totalAmountArray] = await dbConnection_1.db.query(`SELECT total_amount FROM orders INNER JOIN order_items 
             ON orders.order_id = order_items.order_id WHERE order_items.order_id = ?`, [orderID]);
    const totalAmount = totalAmountArray[0].total_amount;
    let refundResult = null;
    if (return_status === 'received') {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const [returnRows] = await dbConnection_1.db.query(`select return_id from returns inner join order_items
    on returns.order_item_id = order_items.order_item_id where order_id = ?`, [orderID]);
        const returnId = returnRows[0].return_id;
        const [refundData] = await dbConnection_1.db.query("INSERT INTO refunds (return_id, amount) VALUES (?, ?)", [returnId, totalAmount]);
        refundResult = refundData;
    }
    return {
        returnStatusResult, refundResult
    };
};
exports.updateReturnOrder = updateReturnOrder;
const updateRefunds = async (orderID, refundData) => {
    const refundSatus = refundData.refund_status;
    const query = `update refunds inner join
          returns on refunds.return_id = returns.return_id
      inner join order_items
      on returns.order_item_id = order_items.order_item_id
        set refund_status = ? where order_id = ?`;
    const [result] = await dbConnection_1.db.query(query, [refundSatus, orderID]);
    const refundStatusQuery = `select refund_status from refunds inner join returns
          on refunds.return_id = returns.return_id inner join order_items
	       on returns.order_item_id = order_items.order_item_id where order_id = ?`;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [refundStatusResult] = await dbConnection_1.db.query(refundStatusQuery, [orderID]);
    if (refundStatusResult.length === 0) {
        // not refund found
        return null;
    }
    const refundStatus = refundStatusResult[0].refund_status;
    let refundResult = null;
    if (refundStatus === 'success') {
        const query = `UPDATE returns INNER JOIN order_items ON returns.order_item_id = order_items.order_item_id  
                         SET return_status = ? WHERE order_items.order_id = ?`;
        const [result] = await dbConnection_1.db.query(query, ['refunded', orderID]);
        refundResult = result;
    }
    return {
        result, refundResult
    };
};
exports.updateRefunds = updateRefunds;
//# sourceMappingURL=returnOrderModel.js.map