import { Request, Response, NextFunction, RequestHandler } from "express";

const authorizeRoles = (...roles:string[]): RequestHandler=>{
    return (req:Request, res:Response, next:NextFunction)=>{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
           const user = (req as any).user;

     console.log(user.role)
     console.log(roles.includes(user.role))  
      if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden: Access Denied" });
    }

     next();

    };
}

export {authorizeRoles}