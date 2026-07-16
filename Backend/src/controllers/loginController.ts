import {Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import {getUserLoginCredential} from "../models/loginModel"

const loginUser = async (req:Request, res:Response, next:NextFunction)=>{
 
    try{
          const { email, password } = req.body;
          
           if (!email || !password) {
            return res.status(400).send("Email and password required");
            }

        //eslint-disable-next-line @typescript-eslint/no-explicit-any
         const userEmailPassword:any = await getUserLoginCredential(email)
         if (!userEmailPassword.length) {
            return res.status(200).send({message: "Email ID not registered."});
            }

            if(userEmailPassword[0].email === email && userEmailPassword[0].password === password){
                
                const token = jwt.sign({user_email: userEmailPassword[0].email,
                                        user_id:userEmailPassword[0].User_id,
                                        user_role: userEmailPassword[0].role
                },
                                        process.env.JWT_SECRET as string,
                                        { expiresIn: "7d" }
            )

             res.status(200).json({message: "Login successful",
                                token: token,
                                user:{user_email: userEmailPassword[0].email,
                                        user_id:userEmailPassword[0].User_id,
                                        user_role: userEmailPassword[0].role
                                    },
                                });
            }else{
               return res.status(200).send({message:'Invalid email id and password '});
            }

    }
    catch(err){
      next(err)
    }
}

export { loginUser }