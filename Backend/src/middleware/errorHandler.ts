import { Request, Response, NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const error = (err:Error, req:Request, res:Response, next:NextFunction)=>{
     res.status(500).send({message:err.message || "Internal server error"})
     console.log("ERROR is: ",err.message)
}

export {error} 