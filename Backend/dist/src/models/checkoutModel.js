"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderFromCart = void 0;
const dbConnection_1 = require("../../config/dbConnection");
const generateInvoice_1 = require("./orderInvoice/generateInvoice");
const createOrderFromCart = async (userID, orderData) => {
    const connection = await dbConnection_1.db.getConnection();
    try {
        await connection.beginTransaction();
        const [addressId] = await connection.query(`select address.address_id from address inner join user_address on address.address_id = user_address.address_id 
               where user_id = ? and user_address_status = ?`, [userID, orderData.address_status]);
        if (addressId.length === 0) {
            throw new Error("Address not found");
        }
        const [cart] = await connection.query('select * from cart where user_id = ?', [userID]);
        if (cart.length === 0) {
            throw new Error("Cart not found");
        }
        const cart_id = cart[0].cart_id;
        const [cartItem] = await connection.query('select * from cart_items where cart_id = ?', [cart_id]);
        if (cartItem.length === 0) {
            throw new Error("cart is empty");
        }
        const orderTableFields = {
            user_id: userID,
            address_id: addressId[0].address_id
        };
        const ordersTableKey = Object.keys(orderTableFields).join(",");
        const ordersTableValue = Object.values(orderTableFields);
        const ordersTableplaceholder = ordersTableValue.map(() => '?').join(",");
        const orderQuery = `insert into orders ( ${ordersTableKey} ) values ( ${ordersTableplaceholder} )`;
        const [orderTableResult] = await connection.query(orderQuery, [...ordersTableValue]);
        const orderId = orderTableResult.insertId;
        let totalPurchaseAmount = 0;
        let productID = 0;
        const tax = 5;
        for (const item of cartItem) {
            const [variantStock] = await connection.query('SELECT stock FROM product_variants WHERE variant_id = ?', [item.variant_id]);
            if (item.quantity > variantStock[0].stock) {
                throw new Error("Out of stock");
            }
            const [price] = await connection.query('select price from product_variants where product_id = ? and variant_id = ?', [item.product_id, item.variant_id]);
            console.log([price]);
            const orderItemsTableFields = {
                order_id: orderId,
                quantity: item.quantity,
                price: price[0].price,
                product_id: item.product_id
            };
            productID = item.product_id;
            const ordersItemTableKey = Object.keys(orderItemsTableFields).join(",");
            const ordersItemTableValue = Object.values(orderItemsTableFields);
            const ordersItemTableplaceholder = ordersItemTableValue.map(() => '?').join(",");
            const orderItemQuery = `insert into order_items ( ${ordersItemTableKey} ) values ( ${ordersItemTableplaceholder} )`;
            await connection.query(orderItemQuery, [...ordersItemTableValue]);
            const [discountPercentage] = await connection.query('select discount_percentage from product_discounts where product_id = ?', [productID]);
            const discount = discountPercentage.length === 0 || discountPercentage[0].discount_percentage === null ? 0 : discountPercentage[0].discount_percentage;
            const amountWithDiscount = (item.quantity * price[0].price) * (1 - (discount / 100));
            totalPurchaseAmount = totalPurchaseAmount + amountWithDiscount;
            await connection.query('UPDATE product_variants SET stock = stock - ? WHERE variant_id = ?', [item.quantity, item.variant_id]);
            await connection.query('UPDATE products SET stock = stock - ? WHERE  product_id = ?', [item.quantity, productID]);
        }
        const taxAmount = totalPurchaseAmount * (tax / 100);
        const finalAmount = totalPurchaseAmount + taxAmount;
        await connection.query("update orders set total_amount = ? where order_id = ?", [finalAmount, orderId]);
        const [paymentMethodID] = await connection.query('select method_id from payment_methods where method_name = ?', [orderData.payment_method_name]);
        if (paymentMethodID.length === 0) {
            throw new Error("Invalid payment method");
        }
        const transactionId = orderData.payment_method_name === "COD" ? null : orderData.transaction_id;
        const paymentTableFields = {
            order_id: orderId,
            amount: finalAmount,
            transaction_id: transactionId,
            method_id: paymentMethodID[0].method_id
        };
        const paymentTableKey = Object.keys(paymentTableFields).join(",");
        const paymentTableValue = Object.values(paymentTableFields);
        const paymentTablePlaceholder = paymentTableValue.map(() => '?').join(",");
        const paymentTableQuery = `insert into payments ( ${paymentTableKey} ) values ( ${paymentTablePlaceholder} )`;
        await connection.query(paymentTableQuery, [...paymentTableValue]);
        await connection.query('DELETE FROM cart_items WHERE cart_id = ?', [cart_id]);
        const [users] = await connection.query('select * from users where user_id = ?', [userID]);
        const orderDataPDf = {
            user_Details: users[0],
            order_id: orderId,
            items: cartItem,
            tax: tax,
            total_amount: finalAmount,
            addressId: addressId,
        };
        console.log("Generating invoice...");
        const invoicePath = (0, generateInvoice_1.generateInvoice)(orderDataPDf);
        await connection.query("UPDATE orders SET invoice_path = ? WHERE order_id = ?", [invoicePath, orderId]);
        console.log("Invoice path:", invoicePath);
        await connection.commit();
        return {
            order_id: orderId,
            total_amount: finalAmount
        };
    }
    catch (err) {
        await connection.rollback();
        throw err;
    }
    finally {
        connection.release();
    }
};
exports.createOrderFromCart = createOrderFromCart;
//# sourceMappingURL=checkoutModel.js.map