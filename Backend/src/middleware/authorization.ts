/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request, Response, NextFunction} from 'express'
import jwt from "jsonwebtoken";
const autoMiddleware = (req: Request, res: Response, next: NextFunction)=>{
     
     const header = req.headers["authorization"];

      if (!header) {
            return res.status(401).send("Token missing");
        }

      const token = header.split(" ")[1];

    if (!token) {
    return res.status(401).send("Token missing");
    }

       try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        user_id: number;
        user_email: string;
        user_role: string;
      };

      (req as any).user = {
        user_id: decoded.user_id,
        email: decoded.user_email,
        role: decoded.user_role
      };
      
    next();
  } catch (err) {
    console.log(err)
    return res.status(403).send("Invalid or expired token");
  }

}

export {autoMiddleware}