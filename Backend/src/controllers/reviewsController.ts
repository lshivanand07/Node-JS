import { Request, Response, NextFunction } from "express";
import {fetchAllReviews, fetchReviewsById, insertReviewsValue, updateReviewsById, deleteReviewsById} from "../models/reviewsModel";

const getReviews = async (req:Request, res:Response, next:NextFunction)=>{
     try{
        const reviewID = Number(req.params.reviewID);

        if(reviewID){
          const rows = await fetchReviewsById(reviewID)
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
           const data:any[]=[];
       data.push(rows);
        if(data[0].length === 0){
        res.status(404).send("review id Not Found")
       }else{
        res.status(200).send(data)
       }
        }else{
            const rows = await fetchAllReviews()
              //eslint-disable-next-line @typescript-eslint/no-explicit-any
           const data:any[]=[];
       data.push(rows);
        if(data[0].length === 0){
        res.status(404).send("review data Not Found")
       }else{
        res.status(200).send(data)
       }
        }
     }
     catch(err){
      return next(err)
     }
}

const createReviews = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const reviewData = req.body;
        const result = await insertReviewsValue(reviewData)
                res.status(201).send({message: "review data has been successfully uploaded.",
                                  data:result
                    });
    }
    catch(err){
       return next(err)
    }
}

const updateReviews = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const reviewID = Number(req.params.reviewID)
      const reviewData = req.body;

       const result = await updateReviewsById(reviewID, reviewData)
         if(result.affectedRows === 0){
                res.status(404).send("review Id Not Found")
            }else{
                 res.status(200).send("review Data Updated Successfully") 
            }
    }
    catch(err){
        return next(err)
    }
}

const deleteReviews = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const reviewID = Number(req.params.reviewID)
       const result = await deleteReviewsById(reviewID)
       if(result.affectedRows === 0){
        res.status(404).send("review id is Not Found")
      }else{
        res.status(200).send("review data delete Successfully")
      }
    }
    catch(err){
    return next(err)
    }
}

export {getReviews, createReviews, updateReviews, deleteReviews}