import { ResultSetHeader } from 'mysql2/promise';
declare const fetchCoupons: () => Promise<import("mysql2/promise").QueryResult>;
declare const fetchOneCouponsByCouponId: (couponID: number) => Promise<import("mysql2/promise").QueryResult>;
declare const fetchCouponsByUserId: (userID: number) => Promise<import("mysql2/promise").QueryResult>;
declare const insertCoupons: (couponData: object) => Promise<import("mysql2/promise").QueryResult>;
declare const insertUserCoupons: (userCouponsData: Record<string, unknown>) => Promise<import("mysql2/promise").QueryResult | null>;
declare const updateCouponsById: (couponID: number, couponData: object) => Promise<ResultSetHeader>;
export { fetchCoupons, fetchOneCouponsByCouponId, fetchCouponsByUserId, insertCoupons, insertUserCoupons, updateCouponsById };
//# sourceMappingURL=couponsModel.d.ts.map