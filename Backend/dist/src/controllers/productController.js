"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProducts = exports.getProductVariants = exports.getProductBrand = exports.getProductImages = exports.getProductReviews = exports.getProductDiscount = exports.getProducts = void 0;
const productModel_1 = require("../models/productModel");
const getProducts = async (req, res, next) => {
    try {
        const productID = Number(req.params.productID);
        if (productID) {
            const rows = await (0, productModel_1.fetchOneProductsByProductId)(productID);
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = [];
            data.push(rows);
            if (data[0].length === 0) {
                res.status(404).send("productID is not found");
            }
            else {
                res.status(200).send(data);
            }
        }
        else {
            const rows = await (0, productModel_1.fetchAllProducts)();
            res.status(200).send(rows);
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.getProducts = getProducts;
const getProductDiscount = async (req, res, next) => {
    try {
        const productID = Number(req.params.productID);
        const rows = await (0, productModel_1.fetchProductDiscountByprodutId)(productID);
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = [];
        data.push(rows);
        if (data[0].length === 0) {
            res.status(404).send("productID is not found");
        }
        else {
            res.status(200).send(data);
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.getProductDiscount = getProductDiscount;
const getProductReviews = async (req, res, next) => {
    try {
        const productID = Number(req.params.productID);
        const rows = await (0, productModel_1.fetchProductReviewsByprodutId)(productID);
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = [];
        data.push(rows);
        if (data[0].length === 0) {
            res.status(404).send("productID is not found");
        }
        else {
            res.status(200).send(data);
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.getProductReviews = getProductReviews;
const getProductImages = async (req, res, next) => {
    try {
        const productID = Number(req.params.productID);
        const rows = await (0, productModel_1.fetchProductImagesByprodutId)(productID);
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = [];
        data.push(rows);
        if (data[0].length === 0) {
            res.status(404).send("productID is not found");
        }
        else {
            res.status(200).send(data);
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.getProductImages = getProductImages;
const getProductBrand = async (req, res, next) => {
    try {
        const productID = Number(req.params.productID);
        const rows = await (0, productModel_1.fetchProductBrandByprodutId)(productID);
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = [];
        data.push(rows);
        if (data[0].length === 0) {
            res.status(404).send("productID is not found");
        }
        else {
            res.status(200).send(data);
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.getProductBrand = getProductBrand;
const getProductVariants = async (req, res, next) => {
    try {
        const productID = Number(req.params.productID);
        const rows = await (0, productModel_1.fetchProductVariantsByprodutId)(productID);
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = [];
        data.push(rows);
        if (data[0].length === 0) {
            res.status(404).send("productID is not found");
        }
        else {
            res.status(200).send(data);
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.getProductVariants = getProductVariants;
const createProducts = async (req, res, next) => {
    try {
        const productData = req.body;
        const result = await (0, productModel_1.insertProductData)(productData);
        res.status(201).send({ message: "Product data has been successfully uploaded.",
            data: result
        });
    }
    catch (err) {
        return next(err);
    }
};
exports.createProducts = createProducts;
const updateProduct = async (req, res, next) => {
    try {
        const productID = Number(req.params.productID);
        const productData = req.body;
        const result = await (0, productModel_1.updateProductByProductId)(productID, productData);
        const productRows = result.productTableResult.affectedRows ?? 0;
        const discountRows = result.productDiscountsTableResult?.affectedRows ?? 0;
        const imageRows = result.productImageTableResult?.affectedRows ?? 0;
        if (productRows === 0 && discountRows === 0 && imageRows === 0) {
            res.status(404).send("product Id Not Found");
        }
        else {
            res.status(200).send("Product Data Updated Successfully");
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res, next) => {
    try {
        const productID = Number(req.params.productID);
        const result = await (0, productModel_1.deleteProductByProductId)(productID);
        if (result.affectedRows === 0) {
            res.status(404).send("productID is Not Found");
        }
        else {
            res.status(200).send("product data delete successfull");
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map