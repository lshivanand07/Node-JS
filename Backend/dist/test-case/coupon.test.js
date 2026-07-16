"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app");
describe("Coupons API", () => {
    test("GET Coupons: /api/get-all-coupons", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get('/api/get-all-coupons')
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(200);
    });
    test("GET Coupons: /api/get-one-coupons/:couponID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get('/api/get-one-coupons/1')
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(200);
    });
    test("GET Coupons: /api/get-user-coupons/:userID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get('/api/get-user-coupons/1')
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(200);
    });
    // 404
    test("GET Coupons: /api/get-all-coupons", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get('/api/get-coupons')
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(404);
    });
    test("GET Coupons: /api/get-one-coupons/:couponID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get('/api/get-one-coupons/50')
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(404);
    });
    test("GET Coupons: /api/get-user-coupons/:userID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get('/api/get-user-coupons/50')
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(404);
    });
    test("POST coupons: /api/post-coupons ", async () => {
        const couponData = {
            coupon_code: "shivu360",
            discount: 40,
            expiry_date: "2026-05-01",
            min_purchase_amount: 1500,
            max_discount: 400,
            user_limit: 2
        };
        const res = await (0, supertest_1.default)(app_1.server).post("/api/post-coupons").send(couponData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(201);
    });
    test("POST coupons: /api/post-user-coupons ", async () => {
        const couponData = {
            couponCode: "bigsale",
            used: true,
            user_id: 5,
            usage_count: 1,
        };
        const res = await (0, supertest_1.default)(app_1.server).post("/api/post-user-coupons").send(couponData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(201);
    });
    test("POST coupons: /api/post-user-coupons ", async () => {
        const couponData = {
            // don't have 'megasale' coupon code
            couponCode: "megasale",
            used: true,
            user_id: 5,
            usage_count: 1,
        };
        const res = await (0, supertest_1.default)(app_1.server).post("/api/post-user-coupons").send(couponData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(404);
    });
    test("Update coupons: /api/edit-coupons/:couponID", async () => {
        const couponData = {
            coupon_code: "alpha404"
        };
        const res = await (0, supertest_1.default)(app_1.server).put("/api/edit-coupons/102").send(couponData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(200);
    });
    test("Update coupons: /api/edit-coupons/:couponID", async () => {
        const couponData = {
            coupon_code: "alpha404"
        };
        const res = await (0, supertest_1.default)(app_1.server).put("/api/edit-coupons/1000").send(couponData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(404);
    });
});
//# sourceMappingURL=coupon.test.js.map