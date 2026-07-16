import {Request, Response, NextFunction } from 'express'
import {fetchReturnStatus, fetchRefundStatus, insertReturnOrders, updateReturnOrder, updateRefunds} from '../models/returnOrderModel'


const getReturnStatus = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const orderID = Number(req.params.orderID)
        const rows = await fetchReturnStatus(orderID)
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data:any[] = []
        data.push(rows)
        if(data[0].length === 0){
            res.status(404).send("Order Id is not found")
        }else{
            res.status(200).send(data)
        }
    }
    catch(err){
        return next(err)
    }
}

const getRefundStatus = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const orderID = Number(req.params.orderID)
        const rows = await fetchRefundStatus(orderID)
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data:any[] = []
        data.push(rows)
        if(data[0].length === 0){
            res.status(404).send("Order Id is not found")
        }else{
            res.status(200).send(data)
        }
    }
    catch(err){
        return next(err)
    }
}

const createReturnOrders = async (req:Request, res:Response, next: NextFunction)=>{
      try{
        const returnOrderData = req.body;
        if(returnOrderData.reason === undefined){
            res.status(400).send("Return order reason required")
        }else{
            const result = await insertReturnOrders(returnOrderData)
        res.status(201).send({message: "return data has been successfully inserted.",
                                  data:result
                                })
                            }
      }
      catch(err){
         return next(err)
      }
}

const updateReturnStatusByOrderID = async (req:Request, res:Response, next: NextFunction)=>{
       try{
        const orderID = Number(req.params.orderID);
        const returnOrderData = req.body
        
         const result = await updateReturnOrder(orderID, returnOrderData)
         if(result.returnStatusResult.affectedRows === 0){
            res.status(404).send("order Id is Not Found")
         }else{
         res.status(200).send("return status updated successfully")
         }

       }
       catch(err){
        return next(err)
       }
}


const updateRefundsStatusOrderID = async (req:Request, res:Response, next: NextFunction)=>{
       try{
        const orderID = Number(req.params.orderID);
        const refundData = req.body
        
         const result = await updateRefunds(orderID, refundData)
         if(!result || result.result.affectedRows === 0){
            res.status(404).send("order Id is Not Found")
         }else{
         res.status(200).send("Refunds status updated successfully")
         }
       }
       catch(err){
        return next(err)
       }
}



export {getReturnStatus, getRefundStatus, createReturnOrders, updateReturnStatusByOrderID, updateRefundsStatusOrderID}