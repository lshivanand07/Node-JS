"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCouponsById = exports.insertUserCoupons = exports.insertCoupons = exports.fetchCouponsByUserId = exports.fetchOneCouponsByCouponId = exports.fetchCoupons = void 0;
const dbConnection_1 = require("../../config/dbConnection");
const fetchCoupons = async () => {
    const [rows] = await dbConnection_1.db.query('select * from coupons');
    return rows;
};
exports.fetchCoupons = fetchCoupons;
const fetchOneCouponsByCouponId = async (couponID) => {
    const [rows] = await dbConnection_1.db.query(`select * from coupons where coupon_id = ?`, [couponID]);
    return rows;
};
exports.fetchOneCouponsByCouponId = fetchOneCouponsByCouponId;
const fetchCouponsByUserId = async (userID) => {
    const [rows] = await dbConnection_1.db.query(`select * from coupons inner join user_coupons
       on coupons.coupon_id = user_coupons.coupon_id where user_id = ?`, [userID]);
    return rows;
};
exports.fetchCouponsByUserId = fetchCouponsByUserId;
const insertCoupons = async (couponData) => {
    const couponKey = Object.keys(couponData).join(",");
    const couponValue = Object.values(couponData);
    const placeholder = couponValue.map(() => '?').join(",");
    const query = `insert into coupons ( ${couponKey} ) value ( ${placeholder} )`;
    const [result] = await dbConnection_1.db.query(query, [...couponValue]);
    return result;
};
exports.insertCoupons = insertCoupons;
const insertUserCoupons = async (userCouponsData) => {
    const couponCode = userCouponsData.couponCode;
    console.log("code: ", couponCode);
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [rows] = await dbConnection_1.db.query('select coupon_id from coupons where coupon_code = ?', [couponCode]);
    if (!rows.length) {
        return null;
    }
    const couponID = rows[0].coupon_id;
    const userCouponFields = {
        "used": userCouponsData.used,
        "user_id": userCouponsData.user_id,
        "usage_count": userCouponsData.usage_count,
        "coupon_id": couponID
    };
    const userCouponKey = Object.keys(userCouponFields).join(",");
    const userCouponValue = Object.values(userCouponFields);
    const userCouponPlaceholder = userCouponValue.map(() => '?').join(",");
    const query = `INSERT INTO user_coupons (${userCouponKey})
                      VALUES (${userCouponPlaceholder})`;
    const [result] = await dbConnection_1.db.query(query, [...userCouponValue]);
    return result;
};
exports.insertUserCoupons = insertUserCoupons;
const updateCouponsById = async (couponID, couponData) => {
    const couponKey = Object.keys(couponData)
        .map((couponKey) => `${couponKey} = ?`).join(",");
    const couponValue = Object.values(couponData);
    const query = `update coupons set ${couponKey} where coupon_id = ?`;
    const [result] = await dbConnection_1.db.query(query, [...couponValue, couponID]);
    return result;
};
exports.updateCouponsById = updateCouponsById;
//# sourceMappingURL=couponsModel.js.map