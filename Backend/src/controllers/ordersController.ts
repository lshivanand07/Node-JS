/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { fetchOrderByOrderId, fetchOrdersByOrderStatus, individualProductOrder, fetchOrdersByUserId, fetchAllOrders, updateOrdersByUserId} from "../models/ordersModel";

const getOrders = async (req:Request, res:Response, next:NextFunction)=>{
      try{
        const userID = (req as any).user.user_id;
        const orderStatus = req.params.orderStatus as string
        const orderID = Number(req.params.orderID )
        const productID = Number(req.params.productID)

        const handelResponse = (rows:any, message:string) =>{
        const data:any[] = []
            data.push(rows)
            if(data[0].length === 0){
                res.status(200).send({message:message})
            }else{
                res.status(200).send(data)
            }
        }

        if(orderID){
            const rows = await fetchOrderByOrderId(orderID)
            handelResponse (rows, "Order ID not found")
            return
        }
        
        if(orderStatus){
            const rows = await fetchOrdersByOrderStatus(orderStatus)
            handelResponse (rows, "No orders found for this status")
            return
        }

        if(productID){
            const rows = await individualProductOrder(productID)
            handelResponse (rows, "No orders found for this product")
            return
        }

        if(userID){
            const rows = await fetchOrdersByUserId(userID)
            handelResponse (rows, "No orders found for user")
            return
        }

      }
      catch(err){
           return next(err)
      }
}

const getAllOrders = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const rows = await fetchAllOrders()
        res.status(200).send(rows)
    }
    catch(err){
       return next(err)
    }
}

const updateOrders = async (req:Request, res:Response, next:NextFunction)=>{
    try{
      const userID = Number(req.params.userID);
      const orderId = Number(req.params.orderId)
      console.log('dnd', userID , orderId)
      const ordersData = req.body

      const result = await updateOrdersByUserId(userID, orderId, ordersData)
      if(result.affectedRows === 0){
        res.status(200).send({message:"user id not found"})
      }else{
        res.status(200).send({message:"order and payment status updated successfully"})
      }

    }
    catch(err){
      return next(err)
    }
}


export {getOrders, getAllOrders, updateOrders}