import { ResultSetHeader } from 'mysql2';
declare const fetchAllReviews: () => Promise<import("mysql2").QueryResult>;
declare const fetchReviewsById: (reviewID: number) => Promise<import("mysql2").QueryResult>;
declare const insertReviewsValue: (reviewData: object) => Promise<import("mysql2").QueryResult>;
declare const updateReviewsById: (reviewID: number, reviewData: object) => Promise<ResultSetHeader>;
declare const deleteReviewsById: (reviewID: number) => Promise<ResultSetHeader>;
export { fetchAllReviews, fetchReviewsById, insertReviewsValue, updateReviewsById, deleteReviewsById };
//# sourceMappingURL=reviewsModel.d.ts.map