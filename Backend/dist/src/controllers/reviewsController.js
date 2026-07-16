"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviews = exports.updateReviews = exports.createReviews = exports.getReviews = void 0;
const reviewsModel_1 = require("../models/reviewsModel");
const getReviews = async (req, res, next) => {
    try {
        const reviewID = Number(req.params.reviewID);
        if (reviewID) {
            const rows = await (0, reviewsModel_1.fetchReviewsById)(reviewID);
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = [];
            data.push(rows);
            if (data[0].length === 0) {
                res.status(404).send("review id Not Found");
            }
            else {
                res.status(200).send(data);
            }
        }
        else {
            const rows = await (0, reviewsModel_1.fetchAllReviews)();
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = [];
            data.push(rows);
            if (data[0].length === 0) {
                res.status(404).send("review data Not Found");
            }
            else {
                res.status(200).send(data);
            }
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.getReviews = getReviews;
const createReviews = async (req, res, next) => {
    try {
        const reviewData = req.body;
        const result = await (0, reviewsModel_1.insertReviewsValue)(reviewData);
        res.status(201).send({ message: "review data has been successfully uploaded.",
            data: result
        });
    }
    catch (err) {
        return next(err);
    }
};
exports.createReviews = createReviews;
const updateReviews = async (req, res, next) => {
    try {
        const reviewID = Number(req.params.reviewID);
        const reviewData = req.body;
        const result = await (0, reviewsModel_1.updateReviewsById)(reviewID, reviewData);
        if (result.affectedRows === 0) {
            res.status(404).send("review Id Not Found");
        }
        else {
            res.status(200).send("review Data Updated Successfully");
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.updateReviews = updateReviews;
const deleteReviews = async (req, res, next) => {
    try {
        const reviewID = Number(req.params.reviewID);
        const result = await (0, reviewsModel_1.deleteReviewsById)(reviewID);
        if (result.affectedRows === 0) {
            res.status(404).send("review id is Not Found");
        }
        else {
            res.status(200).send("review data delete Successfully");
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.deleteReviews = deleteReviews;
//# sourceMappingURL=reviewsController.js.map