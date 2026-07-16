import { Request, Response, NextFunction } from 'express';
import {fetchOneUserCartsByUserId, createUserCart, updateCart, deleteUserCartByUserId} from '../models/cartsModel';


// get user cart

const getUserCartByUserID = async(req:Request, res:Response, next:NextFunction)=>{
    try{
       //eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userID = (req as any).user.user_id;
      console.log(userID)
      const rows = await fetchOneUserCartsByUserId(userID)
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data:any[]=[]
      data.push(rows)
      if(data[0].length === 0){
        res.status(200).send({message:'Your Cart is Empty'})
      }else{
        res.status(200).send(data)
      }

    }
    catch(err){
   return next(err)
    }
}

    const createUserCarts = async (req:Request, res:Response, next:NextFunction)=>{
        try{
           //eslint-disable-next-line @typescript-eslint/no-explicit-any
           const userID = (req as any).user.user_id;
             const cartData = req.body;
             const result = await createUserCart(userID, cartData)
             res.status(201).send({message: "cart created successfully.",
                                  data:result})
        }
        catch(err){
           return next(err)
        }
}

const upadateCartItems = async (req:Request, res:Response, next:NextFunction)=>{
  try{
    const productVariantID = Number(req.params.productVariantID);
    const cartData = req.body
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userID = (req as any).user.user_id;

  const result =  await updateCart(productVariantID, cartData, userID)
  if(result.affectedRows === 0){
        res.status(404).send("product variant is Not Found")
      }else{
        res.status(200).send("cart item upadate successfull")
      }
  }
  catch(err){
    return next(err)
  }

}

const deleteUserCart = async (req:Request, res:Response, next:NextFunction)=>{
  try{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
     const userID = (req as any).user.user_id;
     console.log(userID)
   const productID  = Number(req.params.productID)
    const variantID  = Number(req.params.variantID)
  const result =await deleteUserCartByUserId(userID, productID, variantID)
     if(result.affectedRows === 0){
        res.status(404).send("userID id is Not Found")
      }else{
        res.status(200).send("user cart delete Successfully")
      }
  }
  catch(err){
    return next(err)
  }
  }


export {getUserCartByUserID, createUserCarts, upadateCartItems, deleteUserCart}