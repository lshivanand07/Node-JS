"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductByProductId = exports.updateProductByProductId = exports.insertProductData = exports.fetchProductVariantsByprodutId = exports.fetchProductBrandByprodutId = exports.fetchProductImagesByprodutId = exports.fetchProductReviewsByprodutId = exports.fetchProductDiscountByprodutId = exports.fetchOneProductsByProductId = exports.fetchAllProducts = void 0;
const dbConnection_1 = require("../../config/dbConnection");
const fetchAllProducts = async () => {
    const [rows] = await dbConnection_1.db.query(`SELECT * FROM products
inner join product_images on products.product_id = product_images.product_id 
inner join product_discounts on products.product_id = product_discounts.product_id`);
    return rows;
};
exports.fetchAllProducts = fetchAllProducts;
const fetchOneProductsByProductId = async (productID) => {
    const [rows] = await dbConnection_1.db.query("select * from products where product_id = ?", [productID]);
    return rows;
};
exports.fetchOneProductsByProductId = fetchOneProductsByProductId;
const fetchProductDiscountByprodutId = async (productID) => {
    const [rows] = await dbConnection_1.db.query("select * from product_discounts where product_id = ?", [productID]);
    return rows;
};
exports.fetchProductDiscountByprodutId = fetchProductDiscountByprodutId;
const fetchProductReviewsByprodutId = async (productID) => {
    const [rows] = await dbConnection_1.db.query("select * from reviews where product_id = ?", [productID]);
    return rows;
};
exports.fetchProductReviewsByprodutId = fetchProductReviewsByprodutId;
const fetchProductImagesByprodutId = async (productID) => {
    const [rows] = await dbConnection_1.db.query("select * from product_images where product_id = ?", [productID]);
    return rows;
};
exports.fetchProductImagesByprodutId = fetchProductImagesByprodutId;
const fetchProductBrandByprodutId = async (productID) => {
    const query = `select product_id, product_name, brand.brand_id, brand_name from brand
     inner join products
     on brand.brand_id = products.brand_id
       where product_id = ?`;
    const [rows] = await dbConnection_1.db.query(query, [productID]);
    return rows;
};
exports.fetchProductBrandByprodutId = fetchProductBrandByprodutId;
const fetchProductVariantsByprodutId = async (productID) => {
    const query = `select product_id, product_name, categories.* from categories
    inner join products
    on categories.category_id = products.category_id
     where product_id = ?`;
    const [rows] = await dbConnection_1.db.query(query, [productID]);
    return rows;
};
exports.fetchProductVariantsByprodutId = fetchProductVariantsByprodutId;
//eslint-disable-next-line @typescript-eslint/no-explicit-any
const insertProductData = async (productData) => {
    const productTableFields = {
        product_name: productData.product_name,
        description: productData.description,
        seller_id: productData.seller_id
    };
    const productTableKeys = Object.keys(productTableFields).join(",");
    const productTableValues = Object.values(productTableFields);
    const productTablePlaceholders = productTableValues.map(() => '?').join(",");
    const productQuery = `insert into products ( ${productTableKeys} ) values ( ${productTablePlaceholders} )`;
    const [productResult] = await dbConnection_1.db.query(productQuery, [...productTableValues]);
    const product_id = productResult.insertId;
    const productDiscountsTableFields = {
        discount_percentage: productData.discount.discount_percentage,
        start_date: productData.discount.start_date,
        end_date: productData.discount.end_date,
        product_id: product_id
    };
    const productDiscountsTableKeys = Object.keys(productDiscountsTableFields).join(",");
    const productDiscountsTableValues = Object.values(productDiscountsTableFields);
    const productDiscountsTablePlaceholders = productDiscountsTableValues.map(() => '?').join(",");
    const productDiscountQuery = `insert into product_discounts ( ${productDiscountsTableKeys} ) values ( ${productDiscountsTablePlaceholders} )`;
    const [productDiscountResult] = await dbConnection_1.db.query(productDiscountQuery, [...productDiscountsTableValues]);
    const productImagesTableFields = {
        image_url: productData.image_url,
        product_id: product_id
    };
    const productImagesTableKeys = Object.keys(productImagesTableFields).join(",");
    const productImagesTableValues = Object.values(productImagesTableFields);
    const productImagesTablePlaceholders = productImagesTableValues.map(() => '?').join(",");
    const productImagesQuery = `insert into product_images ( ${productImagesTableKeys} ) values ( ${productImagesTablePlaceholders} )`;
    const [productImagesResult] = await dbConnection_1.db.query(productImagesQuery, [...productImagesTableValues]);
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const productVariantsResults = [];
    for (const variants of productData.variants) {
        const productVariantsTableFields = {
            size: variants.size,
            color: variants.color,
            price: variants.price,
            stock: variants.stock,
            product_id: product_id
        };
        const productVariantsKeys = Object.keys(productVariantsTableFields).join(",");
        const productVariantsValues = Object.values(productVariantsTableFields);
        const productVariantsPlaceholders = productVariantsValues.map(() => '?').join(",");
        const productVariantsQuery = `insert into product_variants (${productVariantsKeys}) values (${productVariantsPlaceholders})`;
        const result = await dbConnection_1.db.query(productVariantsQuery, [...productVariantsValues]);
        productVariantsResults.push(result);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [stockResult] = await dbConnection_1.db.query(`SELECT SUM(stock) as totalStock FROM product_variants WHERE product_id = ?`, [product_id]);
    await dbConnection_1.db.query(`UPDATE products SET stock = stock + ? WHERE product_id = ?`, [stockResult[0].totalStock, product_id]);
    return {
        productResult, productDiscountResult, productImagesResult, productVariantsResults
    };
};
exports.insertProductData = insertProductData;
const updateProductByProductId = async (productID, productData) => {
    const productImageColumn = new Set(['image_url']);
    const productDiscountsColumn = new Set(['discount_percentage', 'start_date', 'end_date',]);
    const productImageFields = {};
    const productDiscountsFields = {};
    const productFields = {};
    for (const key in productData) {
        if (productImageColumn.has(key)) {
            productImageFields[key] = productData[key];
        }
        else if (productDiscountsColumn.has(key)) {
            productDiscountsFields[key] = productData[key];
        }
        else {
            productFields[key] = productData[key];
        }
    }
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    let productTableResult;
    let productDiscountsTableResult;
    let productImageTableResult;
    const productTableKeys = Object.keys(productFields)
        .map((productTableKeys) => `${productTableKeys}=?`).join(',');
    const productTableVlaue = Object.values(productFields);
    if (productTableKeys.length > 0) {
        [productTableResult] = await dbConnection_1.db.query(`update products set ${productTableKeys} where product_id = ? `, [...productTableVlaue, productID]);
    }
    const productDiscountsTableKeys = Object.keys(productDiscountsFields)
        .map((productDiscountsTableKeys) => `${productDiscountsTableKeys}=?`).join(',');
    const productDiscountsTableVlaue = Object.values(productDiscountsFields);
    if (productDiscountsTableKeys.length > 0) {
        [productDiscountsTableResult] = await dbConnection_1.db.query(`update product_discounts set ${productDiscountsTableKeys} where product_id = ? `, [...productDiscountsTableVlaue, productID]);
    }
    const productImageTableKeys = Object.keys(productImageFields)
        .map((productImageTableKeys) => `${productImageTableKeys}=?`).join(',');
    const productImageTableVlaue = Object.values(productImageFields);
    if (productImageTableKeys.length > 0) {
        [productImageTableResult] = await dbConnection_1.db.query(`update product_images set ${productImageTableKeys} where product_id = ? `, [...productImageTableVlaue, productID]);
    }
    return {
        productTableResult, productDiscountsTableResult, productImageTableResult
    };
};
exports.updateProductByProductId = updateProductByProductId;
const deleteProductByProductId = async (productID) => {
    const [result] = await dbConnection_1.db.query('delete from products where product_id = ?', [productID]);
    return result;
};
exports.deleteProductByProductId = deleteProductByProductId;
//# sourceMappingURL=productModel.js.map