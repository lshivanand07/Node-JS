"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app");
describe("Refunds API", () => {
    test("POST cart: /api/post-user-cart ", async () => {
        const cartData = {
            quantity: 1,
            product_id: 6,
            variant_id: 46
        };
        const res = await (0, supertest_1.default)(app_1.server).post("/api/post-user-cart").send(cartData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0NTUzNiwiZXhwIjoxNzc4NjUwMzM2fQ.kJWdQKtFTyqOTc1swKKHMNn6F1w-dRFxdIsIB2gT3to");
        expect(res.statusCode).toBe(201);
    });
    test("GET Cart: /api/get-user-cart", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get('/api/get-user-cart')
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0NTUzNiwiZXhwIjoxNzc4NjUwMzM2fQ.kJWdQKtFTyqOTc1swKKHMNn6F1w-dRFxdIsIB2gT3to");
        expect(res.statusCode).toBe(200);
    });
    test("PUT Cart: /api/edit-cart-items/:productVariantID", async () => {
        const cartData = {
            quantity: 1
        };
        const res = await (0, supertest_1.default)(app_1.server).put('/api/edit-cart-items/46').send(cartData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0NTUzNiwiZXhwIjoxNzc4NjUwMzM2fQ.kJWdQKtFTyqOTc1swKKHMNn6F1w-dRFxdIsIB2gT3to");
        expect(res.statusCode).toBe(200);
    });
    test("Delete carts: /api/delete-cart-product/:productID/:variantID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).delete("/api/delete-cart-product/6/46")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0NTUzNiwiZXhwIjoxNzc4NjUwMzM2fQ.kJWdQKtFTyqOTc1swKKHMNn6F1w-dRFxdIsIB2gT3to");
        expect(res.statusCode).toBe(200);
    });
    test("Delete carts: /api/delete-cart-product/:productID/:variantID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).delete("/api/delete-cart-product/6/46")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0NTUzNiwiZXhwIjoxNzc4NjUwMzM2fQ.kJWdQKtFTyqOTc1swKKHMNn6F1w-dRFxdIsIB2gT3to");
        expect(res.statusCode).toBe(404);
    });
});
//# sourceMappingURL=cart.test.js.map