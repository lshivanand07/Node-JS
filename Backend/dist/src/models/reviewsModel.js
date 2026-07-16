"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewsById = exports.updateReviewsById = exports.insertReviewsValue = exports.fetchReviewsById = exports.fetchAllReviews = void 0;
const dbConnection_1 = require("../../config/dbConnection");
const fetchAllReviews = async () => {
    const [rows] = await dbConnection_1.db.query("select * from reviews");
    return rows;
};
exports.fetchAllReviews = fetchAllReviews;
const fetchReviewsById = async (reviewID) => {
    const [rows] = await dbConnection_1.db.query("select * from reviews where review_id = ?", [reviewID]);
    return rows;
};
exports.fetchReviewsById = fetchReviewsById;
const insertReviewsValue = async (reviewData) => {
    const reviewKeys = Object.keys(reviewData).join(",");
    const reviewtValues = Object.values(reviewData);
    const placeholders = reviewtValues.map(() => '?').join(",");
    const query = `insert into reviews ( ${reviewKeys} ) values ( ${placeholders} )`;
    const [result] = await dbConnection_1.db.query(query, [...reviewtValues]);
    return result;
};
exports.insertReviewsValue = insertReviewsValue;
const updateReviewsById = async (reviewID, reviewData) => {
    const reviewKeys = Object.keys(reviewData)
        .map((reviewKeys) => `${reviewKeys} = ?`).join(",");
    const reviewtValues = Object.values(reviewData);
    const query = `update reviews set ${reviewKeys} where review_id = ?`;
    const [result] = await dbConnection_1.db.query(query, [...reviewtValues, reviewID]);
    return result;
};
exports.updateReviewsById = updateReviewsById;
const deleteReviewsById = async (reviewID) => {
    const [result] = await dbConnection_1.db.query('delete from reviews where review_id = ?', [reviewID]);
    return result;
};
exports.deleteReviewsById = deleteReviewsById;
//# sourceMappingURL=reviewsModel.js.map