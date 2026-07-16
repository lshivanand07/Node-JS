"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app");
describe("Refunds API", () => {
    test("GET reviews: /api/get-all-reviews", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get('/api/get-all-reviews');
        expect(res.statusCode).toBe(200);
    });
    test("GET reviews: /api/get-one-reviews/:reviewID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get('/api/get-one-reviews/3');
        expect(res.statusCode).toBe(200);
    });
    // bad url
    test("GET reviews: /api/get-all-reviews", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get('/api/get-reviews');
        expect(res.statusCode).toBe(404);
    });
    test("GET reviews: /api/get-one-reviews/:reviewID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).get('/api/get-one-reviews/50');
        expect(res.statusCode).toBe(404);
    });
    test("POST reviews: /api/post-reviews ", async () => {
        const reviewData = {
            rating: 5,
            user_id: 4,
            product_id: 1
        };
        const res = await (0, supertest_1.default)(app_1.server).post("/api/post-reviews").send(reviewData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(201);
    });
    test("POST reviews: /api/post-reviews ", async () => {
        const reviewData = {
            rating: 5,
            user_id: 1,
            product_id: 1
        };
        const res = await (0, supertest_1.default)(app_1.server).post("/api/post-reviews").send(reviewData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(500);
    });
    test("Update reviews: /api/edit-review/:reviewID", async () => {
        const reviewData = {
            rating: 3,
        };
        const res = await (0, supertest_1.default)(app_1.server).put("/api/edit-review/5").send(reviewData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(200);
    });
    test("Update reviews: /api/edit-review/:reviewID", async () => {
        const reviewData = {
            rating: 3,
        };
        const res = await (0, supertest_1.default)(app_1.server).put("/api/edit-review/50").send(reviewData)
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(404);
    });
    test("Delete reviews: /api/delete-review/:reviewID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).delete("/api/delete-review/377")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(200);
    });
    test("Delete reviews: /api/delete-review/:reviewID", async () => {
        const res = await (0, supertest_1.default)(app_1.server).delete("/api/delete-review/100")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(404);
    });
});
//# sourceMappingURL=reviews.test.js.map