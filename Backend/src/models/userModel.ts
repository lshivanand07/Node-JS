import { ResultSetHeader } from 'mysql2/promise'
import  { db }  from '../../config/dbConnection'

const getAllUser = async ()=>{
    const [ rows ] = await db.query("SELECT *, DATE_FORMAT(dob, '%d %M %Y') AS dob FROM users ORDER BY admin_viewed ASC, user_id DESC;")
   await db.query('UPDATE users SET admin_viewed = TRUE WHERE admin_viewed = FALSE;')
    return rows;
}

const getOneUserByUserId =  async (userID:number)=>{
  const [ rows ] = await db.query("SELECT *, DATE_FORMAT(dob, '%d %M %Y') AS dob FROM users where user_id = ?", [userID])
  return rows;
}

const getUserInfo =  async (userID:number)=>{
  const [ rows ] = await db.query("select * from users where user_id = ?", [userID])
  return rows;
}

const insertOneUser = async (userData:object)=>{
    
    const keys = Object.keys(userData).join(", ");
    const values = Object.values(userData)
    const placeholders = values.map(()=>'?').join(", ")
    
    const query = `insert into users ( ${keys} ) values ( ${placeholders} )`
    const [result] = await db.query(query, values);
    return result;
}

const updateOneUser = async (userID:number, userData:object)=>{
    const userDataKeys = Object.keys(userData)
    .map((keys)=> `${keys} = ?`)
    .join(", ");
    const userDataValues = Object.values(userData)
    const query = `update users set ${userDataKeys} where user_id = ?`
   const [result] =await db.query<ResultSetHeader>(query, [...userDataValues, userID])
   return result
}

const deleteOneUser = async (userID:number)=>{
   // [row] = [result, fields]
   //  row  =  result = row[0] , fields = row[1]
   const [result] = await db.query<ResultSetHeader>("delete from users where user_id = ?", [userID])
   return result
}

export {getAllUser, getOneUserByUserId, getUserInfo, insertOneUser, updateOneUser, deleteOneUser};
