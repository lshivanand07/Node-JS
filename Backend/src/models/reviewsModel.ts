import { ResultSetHeader } from 'mysql2';
import {db} from '../../config/dbConnection';

const fetchAllReviews =  async ()=>{
    const [rows] = await db.query("select * from reviews")
    return rows
    }

const fetchReviewsById = async (reviewID:number)=>{
    const [rows] = await db.query("select * from reviews where review_id = ?",[reviewID])
    return rows
    }

const insertReviewsValue = async (reviewData:object)=>{
    const reviewKeys = Object.keys(reviewData).join(",")
    const reviewtValues = Object.values(reviewData)
    const placeholders = reviewtValues.map(()=>'?').join(",")

   const query = `insert into reviews ( ${reviewKeys} ) values ( ${placeholders} )`
    const [result] = await db.query(query, [...reviewtValues])
    return result
}

const updateReviewsById = async (reviewID:number, reviewData:object)=>{
    const reviewKeys = Object.keys(reviewData)
    .map((reviewKeys)=>`${reviewKeys} = ?`).join(",")
    const reviewtValues = Object.values(reviewData);

    const query = `update reviews set ${reviewKeys} where review_id = ?`
   const [result] = await db.query<ResultSetHeader>(query,[...reviewtValues, reviewID])
   return result
}

const deleteReviewsById = async (reviewID:number)=>{
   const [result] = await db.query<ResultSetHeader>('delete from reviews where review_id = ?',[reviewID])
   return result
}

export {fetchAllReviews, fetchReviewsById, insertReviewsValue, updateReviewsById, deleteReviewsById}