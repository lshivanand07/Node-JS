import { ResultSetHeader } from 'mysql2/promise';
import {db} from '../../config/dbConnection';

const fetchCoupons = async ()=>{
   const [rows] = await db.query('select * from coupons')
   return rows
}

const fetchOneCouponsByCouponId = async (couponID:number)=>{
   const [rows] = await db.query(`select * from coupons where coupon_id = ?`,[couponID])
    return rows
}

const fetchCouponsByUserId = async (userID:number)=>{
   const [rows] = await db.query(`select * from coupons inner join user_coupons
       on coupons.coupon_id = user_coupons.coupon_id where user_id = ?`,[userID])
       return rows
}

const insertCoupons = async (couponData:object)=>{
   
    const couponKey = Object.keys(couponData).join(",")
    const couponValue = Object.values(couponData);
    const placeholder = couponValue.map(()=>'?').join(",")

    const query = `insert into coupons ( ${couponKey} ) value ( ${placeholder} )`;
    const [result] = await db.query(query,[...couponValue])
    return result;
}

const insertUserCoupons = async(userCouponsData:Record<string, unknown>)=>{
    const couponCode = userCouponsData.couponCode
    console.log("code: ", couponCode)
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
   const [rows]:any =  await db.query('select coupon_id from coupons where coupon_code = ?' , [couponCode])
     if (!rows.length) {
    return null;
  }
   const couponID =  rows[0].coupon_id

   const userCouponFields = {
    "used":userCouponsData.used,
      "user_id":userCouponsData.user_id,
      "usage_count":userCouponsData.usage_count,
      "coupon_id":couponID
   }
   
   const userCouponKey = Object.keys(userCouponFields).join(",")
    const userCouponValue = Object.values(userCouponFields);
    const userCouponPlaceholder = userCouponValue.map(()=>'?').join(",")

     const query = `INSERT INTO user_coupons (${userCouponKey})
                      VALUES (${userCouponPlaceholder})`;
    const [result] = await db.query(query,[...userCouponValue])
    return result;
}

const updateCouponsById = async (couponID:number, couponData:object)=>{
    const couponKey = Object.keys(couponData)
    .map((couponKey)=>`${couponKey} = ?`).join(",")
    const couponValue = Object.values(couponData);

    const query = `update coupons set ${couponKey} where coupon_id = ?`
    const [result] = await db.query<ResultSetHeader>(query,[...couponValue, couponID])
    return result
}

export {fetchCoupons, fetchOneCouponsByCouponId, fetchCouponsByUserId, insertCoupons, insertUserCoupons, updateCouponsById}