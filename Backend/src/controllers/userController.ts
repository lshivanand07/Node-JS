 /* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import {getAllUser, getOneUserByUserId, getUserInfo, insertOneUser, updateOneUser, deleteOneUser} from "../models/userModel";

const getUsers = async (req:Request, res:Response, next:NextFunction)=>{
    try{
       const userID = Number(req.params.userID);
      
       if(userID){

      const rows = await getOneUserByUserId(userID);
      const data:any[] = []
      data.push(rows)

      if(data[0].length === 0){
        res.status(404).send("userID is Not Found")
      }else{
          res.status(200).send(data)
      }
     }else{

        const rows = await getAllUser();
      const data:any[] = []
      data.push(rows)

      if(data.length === 0){
        res.status(404).send("Data is Not Found")
      }else{
          res.status(200).send(data)
      }

     }
    }
    catch(err){
        return next(err)
    }
}

const getMyDetails = async (req:Request, res:Response, next:NextFunction)=>{
    try{
       const userID = (req as any).user.user_id
       const rows = await getUserInfo(userID);
       const data:any[] = []
        data.push(rows)

        if(data[0].length === 0){
            res.status(404).send("userID is Not Found")
        }else{
            res.status(200).send(data)
        }
      
    }
    catch(err){
        return next(err)
    }
}


const postUsers = async (req:Request, res:Response, next:NextFunction)=>{

    try {
         const userData = req.body

           if(!userData.user_id  || !userData.user_name || !userData.password){
            res.status(400).send("id, name, password required")
            console.log("id, Name and password required")
        }else{
            const result = await insertOneUser(userData)
            res.status(201).send({message: "User data has been successfully inserted.",
                                  data:result
                                })
        }
    }
    catch(err){
        return next(err)
    }
}

const updateUsers = async (req:Request, res:Response, next:NextFunction)=>{

    try{
    const userID = Number(req.params.userID)
    const userData = req.body;

    const result = await updateOneUser(userID, userData)
    if(result.affectedRows === 0){
       res.status(404).send("UserID does not exist in the user table.")
    }else{
        res.status(200).send("Your Data is updated successfully")
    }

    }catch(err){
        return next(err)
    }
}

const deleteUsers = async (req:Request, res:Response, next:NextFunction)=>{
    try{
      const userID = Number(req.params.userID);
      const result = await deleteOneUser(userID)

      if(result.affectedRows === 0){
        res.status(404).send("userID does not exist in the user table.")
      }else{
        res.status(200).send("Your data is successfully deleted")
        }
    }
    catch(err){
      return next(err)
    }
}

export {getUsers, getMyDetails, postUsers, updateUsers, deleteUsers}