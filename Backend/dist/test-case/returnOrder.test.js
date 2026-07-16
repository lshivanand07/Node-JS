"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app");
describe("return order API", () => {
    test("GET returnOrder : /api/get-return-status/:orderID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get('/api/get-return-status/4')
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(200);
    });
    test("GET returnOrder : /api/get-refund-status/:orderID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get('/api/get-refund-status/3')
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(200);
    });
    test("GET returnOrder : /api/get-refund-status/:orderID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get('/api/get-return-status/350')
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(404);
    });
    test("GET returnOrder : /api/get-refund-status/:orderID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get('/api/get-refund-status/350')
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(404);
    });
    test("post returnOrder : /api/post-return-orders", async () => {
        const returnData = {
            orderId: 3,
            reason: "damage"
        };
        const res = await (0, supertest_1.default)(app_1.server).post('/api/post-return-orders').send(returnData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(201);
    });
    test("post returnOrder : /api/post-return-orders", async () => {
        const returnData = {
            orderId: 3
        };
        const res = await (0, supertest_1.default)(app_1.server).post('/api/post-return-orders').send(returnData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(400);
    });
    test("post returnOrder : /api/post-return-orders", async () => {
        const returnData = {
            orderNumber: 3,
            reason: "damage"
        };
        const res = await (0, supertest_1.default)(app_1.server).post('/api/post-return-orders').send(returnData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(500);
    });
    test("put returnOrder : /api/edit-return-order-status/:orderID", async () => {
        const returnData = {
            return_status: "picked_up"
        };
        const res = await (0, supertest_1.default)(app_1.server).put('/api/edit-return-order-status/3').send(returnData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(200);
    });
    test("put returnOrder : /api/edit-return-order-status/:orderID", async () => {
        const returnData = {
            return_status: "picked_up"
        };
        const res = await (0, supertest_1.default)(app_1.server).put('/api/edit-return-order-status/17').send(returnData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(404);
    });
    test("put refund : /api/edit-refund-status/8", async () => {
        const returnData = {
            refund_status: "success"
        };
        const res = await (0, supertest_1.default)(app_1.server).put('/api/edit-refund-status/8').send(returnData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(200);
    });
    test("put refund : /api/edit-refund-status/:orderId", async () => {
        const returnData = {
            refund_status: "success"
        };
        const res = await (0, supertest_1.default)(app_1.server).put('/api/edit-refund-status/80').send(returnData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(404);
    });
});
//# sourceMappingURL=returnOrder.test.js.map