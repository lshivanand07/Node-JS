"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserCartByUserId = exports.updateCart = exports.createUserCart = exports.fetchOneUserCartsByUserId = void 0;
const dbConnection_1 = require("../../config/dbConnection");
// get user carts
const fetchOneUserCartsByUserId = async (userID) => {
    const query = (`select cart.user_id, cart.cart_id, quantity, product_name, description, product_variants.*,  product_images.image_url, product_discounts.discount_percentage from cart
inner join cart_items
on cart.cart_id = cart_items.cart_id
left join products
on cart_items.product_id = products.product_id
inner join product_variants
on cart_items.variant_id = product_variants.variant_id
left join product_images
on products.product_id = product_images.product_id
left join product_discounts
on products.product_id = product_discounts.product_id
where cart.user_id = ?`);
    const [rows] = await dbConnection_1.db.query(query, [userID]);
    return rows;
};
exports.fetchOneUserCartsByUserId = fetchOneUserCartsByUserId;
const createUserCart = async (userID, cartData) => {
    let cart_id;
    const [cart] = await dbConnection_1.db.query('SELECT * FROM cart WHERE user_id = ?', [userID]);
    if (cart.length === 0) {
        const [cartTableResult] = await dbConnection_1.db.query('insert into cart (user_id) values (?)', [userID]);
        cart_id = cartTableResult.insertId;
    }
    else {
        cart_id = cart[0].cart_id;
    }
    const [existing] = await dbConnection_1.db.query('SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ? AND variant_id = ?', [cart_id, cartData.product_id, cartData.variant_id]);
    if (existing.length > 0) {
        await dbConnection_1.db.query('UPDATE cart_items SET quantity = quantity + ? WHERE cart_id = ? AND product_id = ? and variant_id = ?', [cartData.quantity, cart_id, cartData.product_id, cartData.variant_id]);
    }
    else {
        await dbConnection_1.db.query('INSERT INTO cart_items (cart_id, product_id, quantity, variant_id) VALUES (?, ?, ?, ?)', [cart_id, cartData.product_id, cartData.quantity, cartData.variant_id]);
    }
};
exports.createUserCart = createUserCart;
const updateCart = async (productVariantID, cartData, userID) => {
    const [variantStock] = await dbConnection_1.db.query('select stock from product_variants where variant_id = ?', [productVariantID]);
    if (variantStock.length === 0) {
        throw new Error("Variant not found");
    }
    const [cart] = await dbConnection_1.db.query('SELECT cart_id FROM cart WHERE user_id = ?', [userID]);
    if (cart.length === 0) {
        throw new Error("Cart not found");
    }
    const quantity = cartData.quantity;
    if (quantity === 0) {
        const [result] = await dbConnection_1.db.query('DELETE FROM cart_items WHERE user_id = ? and variant_id = ?', [userID, productVariantID]);
        return result;
    }
    if (quantity <= variantStock[0].stock) {
        const [result] = await dbConnection_1.db.query('UPDATE cart_items set quantity = ? where variant_id = ?', [cartData.quantity, productVariantID]);
        return result;
    }
    else {
        throw new Error(`Only ${variantStock[0].stock} items available`);
    }
};
exports.updateCart = updateCart;
const deleteUserCartByUserId = async (userID, productID, variantID) => {
    console.log(userID, productID, variantID);
    const query = `DELETE cart_items 
                FROM cart_items
                INNER JOIN cart 
                ON cart.cart_id = cart_items.cart_id
                WHERE cart.user_id = ? 
                AND cart_items.product_id = ? and cart_items.variant_id = ?`;
    const [result] = await dbConnection_1.db.query(query, [userID, productID, variantID]);
    return result;
};
exports.deleteUserCartByUserId = deleteUserCartByUserId;
//# sourceMappingURL=cartsModel.js.map