"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const dbConnection_1 = require("../../config/dbConnection");
const fetchRecords = async () => {
    const [totalUsers] = await dbConnection_1.db.query(`select count(*) as totalUsers from users`);
    const [totalCustomers] = await dbConnection_1.db.query(`select count(*) as totalCustomers from users where role = 'customer'`);
    const [totalSellers] = await dbConnection_1.db.query(`select count(*) as totalSellers from users where role = 'seller'`);
    const [totalProducts] = await dbConnection_1.db.query(`select count(*) as totalProducts from products`);
    const [totalOrders] = await dbConnection_1.db.query(`select count(*) as totalOrders from orders ;`);
    const [totalRevenue] = await dbConnection_1.db.query(`select sum(price) as totalRevenue from order_items `);
    console.log('totalCustomers', totalCustomers);
    const flipkartRecords = {
        totalUsers: totalUsers[0].totalUsers,
        totalCustomers: totalCustomers[0].totalCustomers,
        totalSellers: totalSellers[0].totalSellers,
        totalProducts: totalProducts[0].totalProducts,
        totalOrders: totalOrders[0].totalOrders,
        totalRevenue: totalRevenue[0].totalRevenue
    };
    return flipkartRecords;
};
exports.default = fetchRecords;
//# sourceMappingURL=dashboardModel.js.map