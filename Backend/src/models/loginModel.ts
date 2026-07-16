import { ResultSetHeader } from 'mysql2';
import {db} from '../../config/dbConnection';

const getUserLoginCredential = async (email:string)=>{
 
 const [rows] = await db.query<ResultSetHeader>('select * from users where email = ?', [email])
 return rows
}

export {getUserLoginCredential}