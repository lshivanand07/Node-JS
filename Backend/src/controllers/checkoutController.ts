import { Request, Response, NextFunction } from 'express'
import {createOrderFromCart} from '../models/checkoutModel'

const checkoutController = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userID = (req as any).user.user_id;
        const orderData =  req.body
     const result = await createOrderFromCart(userID, orderData);
    res.json({message: "Order placed successfully",
               order: result
     });
 }
 catch(err){
   return next(err)
}
}

export { checkoutController }