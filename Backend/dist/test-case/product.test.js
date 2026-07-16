"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app");
describe(" product API", () => {
    test("GET products: /api/get-all-products", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get("/api/get-all-products");
        expect(res.statusCode).toBe(200);
    });
    test("GET products: /api/get-one-products/:productID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get("/api/get-one-products/3");
        expect(res.statusCode).toBe(200);
    });
    test("GET products: /api/get-products-discount/:productID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get("/api/get-products-discount/2");
        expect(res.statusCode).toBe(200);
    });
    test("GET products: /api/get-products-reviews/:productID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get("/api/get-products-reviews/3");
        expect(res.statusCode).toBe(200);
    });
    test("GET products: /api/get-products-images/:productID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get("/api/get-products-images/6");
        expect(res.statusCode).toBe(200);
    });
    test("GET products: /api/get-products-brand/:productID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get("/api/get-products-brand/3");
        expect(res.statusCode).toBe(200);
    });
    test("GET products: /api/get-products-variants/:productID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get("/api/get-products-variants/3");
        expect(res.statusCode).toBe(200);
    });
    // 404 Not found product id's
    test("GET products: /api/get-one-products/:productID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get("/api/get-one-products/300");
        expect(res.statusCode).toBe(404);
    });
    test("GET products: /api/get-products-discount/:productID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get("/api/get-products-discount/300");
        expect(res.statusCode).toBe(404);
    });
    test("GET products: /api/get-products-reviews/:productID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get("/api/get-products-reviews/300");
        expect(res.statusCode).toBe(404);
    });
    test("GET products: /api/get-products-images/:productID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get("/api/get-products-images/600");
        expect(res.statusCode).toBe(404);
    });
    test("GET products: /api/get-products-brand/:productID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get("/api/get-products-brand/300");
        expect(res.statusCode).toBe(404);
    });
    test("GET products: /api/get-products-variants/:productID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get("/api/get-products-variants/300");
        expect(res.statusCode).toBe(404);
    });
    test("POST /api/post-product-info - success", async () => {
        const productData = {
            product_id: 100,
            product_name: "Casual Shirt",
            description: "Comfortable cotton shirt",
            stock: 50,
            seller_id: 2,
            discount_percentage: 15,
            discount: {
                start_date: "2026-05-01",
                end_date: "2026-05-10"
            },
            image_url: "https://example.com/images/shirt1.jpg",
            variants: [
                { size: "M", color: "Red", price: 899, stock: 10 },
                { size: "L", color: "Blue", price: 949, stock: 15 }
            ]
        };
        const res = await (0, supertest_1.default)(app_1.server).post("/api/post-product-info").send(productData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicmFodWxAZ21haWwuY29tIiwidXNlcl9pZCI6NywidXNlcl9yb2xlIjoic2VsbGVyIiwiaWF0IjoxNzc4MDQ0MDE1LCJleHAiOjE3Nzg2NDg4MTV9.3neTgRBYOEdXh_7SPvQ9rxqmrFpI1VcG5jIRG8gJnrg");
        expect(res.statusCode).toBe(201);
    });
    test("POST /api/post-product-info - success", async () => {
        const productData = {
            name: "Casual Shirt",
            description: "Comfortable cotton shirt",
            stock: 50,
            seller_id: 2,
            discount_percentage: 15,
            discount: {
                start_date: "2026-05-01",
                end_date: "2026-05-10"
            },
            image_url: "https://example.com/images/shirt1.jpg",
            variants: [
                { size: "M", color: "Red", price: 899, stock: 10 },
                { size: "L", color: "Blue", price: 949, stock: 15 }
            ]
        };
        const res = await (0, supertest_1.default)(app_1.server).post("/api/post-product-info").send(productData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicmFodWxAZ21haWwuY29tIiwidXNlcl9pZCI6NywidXNlcl9yb2xlIjoic2VsbGVyIiwiaWF0IjoxNzc4MDQ0MDE1LCJleHAiOjE3Nzg2NDg4MTV9.3neTgRBYOEdXh_7SPvQ9rxqmrFpI1VcG5jIRG8gJnrg");
        expect(res.statusCode).toBe(500);
    });
    test("Update product: /api/edit-product-info/:productID", async () => {
        const updateProductData = {
            product_name: "cricket Bat"
        };
        const res = await (0, supertest_1.default)(app_1.server).put("/api/edit-product-info/103").send(updateProductData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicmFodWxAZ21haWwuY29tIiwidXNlcl9pZCI6NywidXNlcl9yb2xlIjoic2VsbGVyIiwiaWF0IjoxNzc4MDQ0MDE1LCJleHAiOjE3Nzg2NDg4MTV9.3neTgRBYOEdXh_7SPvQ9rxqmrFpI1VcG5jIRG8gJnrg");
        expect(res.statusCode).toBe(200);
    });
    test("Update product: /products/:productID", async () => {
        const updateProductData = {
            product_name: "cricket Bat"
        };
        const res = await (0, supertest_1.default)(app_1.server).put("/api/edit-product-info/1000").send(updateProductData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicmFodWxAZ21haWwuY29tIiwidXNlcl9pZCI6NywidXNlcl9yb2xlIjoic2VsbGVyIiwiaWF0IjoxNzc4MDQ0MDE1LCJleHAiOjE3Nzg2NDg4MTV9.3neTgRBYOEdXh_7SPvQ9rxqmrFpI1VcG5jIRG8gJnrg");
        expect(res.statusCode).toBe(404);
    });
    test("Update product: /products/:productID", async () => {
        const updateProductData = {
            //invalide fields list (correct: product_name)
            name: "cricket Bat"
        };
        const res = await (0, supertest_1.default)(app_1.server).put("/api/edit-product-info/100").send(updateProductData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicmFodWxAZ21haWwuY29tIiwidXNlcl9pZCI6NywidXNlcl9yb2xlIjoic2VsbGVyIiwiaWF0IjoxNzc4MDQ0MDE1LCJleHAiOjE3Nzg2NDg4MTV9.3neTgRBYOEdXh_7SPvQ9rxqmrFpI1VcG5jIRG8gJnrg");
        expect(res.statusCode).toBe(500);
    });
    test("Delete product: /api/delete-product/:productID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).delete("/api/delete-product/130")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicmFodWxAZ21haWwuY29tIiwidXNlcl9pZCI6NywidXNlcl9yb2xlIjoic2VsbGVyIiwiaWF0IjoxNzc4MDQ0MDE1LCJleHAiOjE3Nzg2NDg4MTV9.3neTgRBYOEdXh_7SPvQ9rxqmrFpI1VcG5jIRG8gJnrg");
        expect(res.statusCode).toBe(200);
    });
    test("Delete product: /api/delete-product/:productID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).delete("/api/delete-product/1000")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicmFodWxAZ21haWwuY29tIiwidXNlcl9pZCI6NywidXNlcl9yb2xlIjoic2VsbGVyIiwiaWF0IjoxNzc4MDQ0MDE1LCJleHAiOjE3Nzg2NDg4MTV9.3neTgRBYOEdXh_7SPvQ9rxqmrFpI1VcG5jIRG8gJnrg");
        expect(res.statusCode).toBe(404);
    });
});
//# sourceMappingURL=product.test.js.map