import { Request, Response, NextFunction } from "express";
import {fetchCoupons, fetchOneCouponsByCouponId, fetchCouponsByUserId, insertCoupons, insertUserCoupons, updateCouponsById} from "../models/couponsModel";

const getCoupons = async (req:Request, res:Response, next:NextFunction)=>{ 
    try{
         const userID = Number(req.params.userID)
         const couponID = Number(req.params.couponID)

         if(userID && !couponID){
           const rows =  await fetchCouponsByUserId(userID)
           // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          const data:any[]=[];
           data.push(rows);
           if(data[0].length === 0){
            res.status(404).send("user id not found")
           }else{
            res.status(200).send(data)
           }
         }else if(couponID){
           const rows =  await fetchOneCouponsByCouponId(couponID)
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          const data:any[]=[];
           data.push(rows);
           if(data[0].length === 0){
            res.status(404).send("coupon id not found")
           }else{
            res.status(200).send(data)
           }
         }else{
            const rows = await fetchCoupons()
            res.status(200).send(rows)
         }
    }
    catch(err){
      return next(err)
    }
}

const createCoupons = async (req:Request, res:Response, next:NextFunction)=>{
    try{
      const couponData = req.body;
      const result = await insertCoupons(couponData)
      res.status(201).send({message:"couponData inserted successfully",
                               data: result})
    }
    catch(err){
      return next(err)
    }  
}

const createUserCoupons = async (req:Request, res:Response, next:NextFunction)=>{
    try{
      const userCouponsData = req.body;
      const result = await insertUserCoupons(userCouponsData)

      if (!result) {
        return res.status(404).send("Coupon not found");
      }

      res.status(201).send({message:"User couponData inserted successfully",
                               data: result})
    }
    catch(err){
      return next(err)
    }  
}

const updateCoupons = async (req:Request, res:Response, next:NextFunction)=>{
    try{
     const couponID = Number(req.params.couponID)
      const couponsData = req.body;

     const result = await updateCouponsById(couponID, couponsData)
     if(result.affectedRows === 0){
        res.status(404).send("coupon id Not found")
     }else{
         res.status(200).send("coupon data updated successfully")
     }
    }
    catch(err){
     return next(err)
    }
}

export {getCoupons, createCoupons, createUserCoupons, updateCoupons}