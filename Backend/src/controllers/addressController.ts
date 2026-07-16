/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import {fetchAllAddress, fetchOneAddressByUserId, insertOneAddress, updateUserAddressByUserId, deleteOneAddressByUserId} from '../models/addressModel';

const getAddress = async (req:Request, res:Response, next:NextFunction)=>{
       try{
           const userID = (req as any).user.user_id;
            if(userID){
            const rows = await fetchOneAddressByUserId(userID);
            const data:any[] = []
            data.push(rows)

            if(data[0].length === 0){
                res.status(200).send({message:"userID Not Found"})
            }else{
                res.status(200).send(data)
            }
            }
            else{
            const rows = await fetchAllAddress();
            const data:any[] = []
            data.push(rows)

            if(data.length === 0){
                res.status(200).send({message:"Address data Not Found"})
            }else{
                res.status(200).send(data)
            }
            }
       }
       catch(err){
          return next(err)
       }
}

const createAddress = async (req:Request, res:Response, next:NextFunction)=>{
     try{
        const userID = (req as any).user.user_id;
         const addressData = req.body;
         if(!addressData.country || !addressData.state || !addressData.districts 
            || !addressData.city || !addressData.street || !addressData.landmark || !addressData.pincode){
             res.status(400).send("address_id, country, state, districts, city, street, landmark and pincode are required")
       }else{

        const result = await insertOneAddress(userID, addressData)
        res.status(201).send({message: "address data has been successfully uploaded.",
                                  data:result
                                });
    }
    }
     catch(err){
     return next(err)
     }
}

const updateAddress = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const userID = (req as any).user.user_id;
        const userAddressStatus = req.params.userAddressStatus as string;
        const addressData = req.body;

        const result = await updateUserAddressByUserId(userID, userAddressStatus, addressData)
        if(result.affectedRows === 0){
             res.status(404).send("address Id Not Found")
        }else{
                 res.status(200).send("address Data Updated Successfully") 
            } 
    }
    catch(err){
        return next(err)
    }
}

const deleteAddress =async (req:Request, res:Response, next:NextFunction)=>{
    try{
       const userID = (req as any).user.user_id;
      const userAddressStatus = req.params.userAddressStatus as string

      const result = await deleteOneAddressByUserId(userID, userAddressStatus)
      if(result.affectedRows === 0){
             res.status(404).send("address Id Not Found")
        }else{
                 res.status(200).send("address Data Deleted Successfully") 
            } 
    }
    catch(err){
    return next(err)
    }
}

export {getAddress, createAddress, updateAddress, deleteAddress}