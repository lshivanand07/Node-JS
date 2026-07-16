"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrdersByUserId = exports.individualProductOrder = exports.fetchOrderByOrderId = exports.fetchOrdersByUserId = exports.fetchOrdersByOrderStatus = exports.fetchAllOrders = void 0;
const dbConnection_1 = require("../../config/dbConnection");
const fetchAllOrders = async () => {
    const [rows] = await dbConnection_1.db.query('select * from orders');
    return rows;
};
exports.fetchAllOrders = fetchAllOrders;
const fetchOrdersByUserId = async (userID) => {
    const query = `select *, address.* from orders
    inner join order_items
    on orders.order_id = order_items.order_id
    inner join products
    on order_items.product_id = products.product_id
	inner join address
    on orders.address_id = address.address_id
    left join product_discounts
    on order_items.product_id =  product_discounts.product_id
    where orders.user_id = ?`;
    const [rows] = await dbConnection_1.db.query(query, [userID]);
    return rows;
};
exports.fetchOrdersByUserId = fetchOrdersByUserId;
const fetchOrderByOrderId = async (orderID) => {
    const query = `select * from orders where order_id = ?`;
    const [rows] = await dbConnection_1.db.query(query, [orderID]);
    return rows;
};
exports.fetchOrderByOrderId = fetchOrderByOrderId;
const fetchOrdersByOrderStatus = async (orderStatus) => {
    const query = `select * from orders
    inner join order_items
    on orders.order_id = order_items.order_id
    inner join products
    on order_items.product_id = products.product_id
    where order_status = ?`;
    const [rows] = await dbConnection_1.db.query(query, [orderStatus]);
    return rows;
};
exports.fetchOrdersByOrderStatus = fetchOrdersByOrderStatus;
const individualProductOrder = async (productID) => {
    const query = `select product_id, orders.* , quantity, price from order_items
     inner join orders on order_items.order_id = orders.order_id where product_id = ?`;
    const [rows] = await dbConnection_1.db.query(query, [productID]);
    return rows;
};
exports.individualProductOrder = individualProductOrder;
const updateOrdersByUserId = async (userID, orderId, ordersData) => {
    const order_status = ordersData.order_status;
    const payment_status = ordersData.payment_status;
    console.log(userID, "  ", orderId);
    const query = `UPDATE orders INNER JOIN payments
                      ON orders.order_id = payments.order_id
                    SET orders.order_status = COALESCE(?, orders.order_status),
                    payments.payment_status = COALESCE(?, payments.payment_status)
                   WHERE user_id = ? AND payments.order_id = ? ;`;
    const [result] = await dbConnection_1.db.query(query, [order_status, payment_status, userID, orderId]);
    return result;
};
exports.updateOrdersByUserId = updateOrdersByUserId;
//# sourceMappingURL=ordersModel.js.map