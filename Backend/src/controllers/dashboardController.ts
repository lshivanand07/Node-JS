import { Request, Response, NextFunction } from "express";
import fetchRecords from "../models/dashboardModel"

const getRecords = async (req:Request, res:Response, next:NextFunction)=>{

    try{
      const result =  await fetchRecords()
console.log('result', result)
   res.status(200).send(result)
    }
    catch(err){
      return next(err)
    }
}

export default getRecords