import { ResultSetHeader } from 'mysql2/promise';
import {db} from '../../config/dbConnection';

//type QueryCallback = (err:Error | null , result:ResultSetHeader)=>void

const fetchAllAddress = async ()=>{
   const [rows] = await db.query('select * from address')
   return rows;
}

const fetchOneAddressByUserId = async (userID:number)=>{
  console.log("userID: ", userID)
    const query = `select users.user_id, address.*, user_address_status, is_default  from address 
inner join user_address
on address.address_id = user_address.address_id
inner join users
on user_address.user_id = users.User_id
where users.user_id = ?`
  const [ rows ] = await db.query(query,[userID])
  return rows;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const insertOneAddress = async ( userID:number, addressData:any)=>{
       const addressTableFields = {
             city: addressData.city,
             state: addressData.state,
             pincode: addressData.pincode,
             country: addressData.country,
             districts: addressData.districts,
             street: addressData.street,
             landmark: addressData.landmark
       }

        const addressTableFieldsKeys = Object.keys(addressTableFields).join(",")
        const addressTableFieldsValue = Object.values(addressTableFields);
        const addressTableFieldsValuePlaceholder = addressTableFieldsValue.map(()=>'?').join(",")

       const addressTableQuery = `insert into address ( ${addressTableFieldsKeys} ) value ( ${addressTableFieldsValuePlaceholder} )`;
       const [addressTableResult]  = await db.query<ResultSetHeader>(addressTableQuery,[...addressTableFieldsValue])

       const addressId = addressTableResult.insertId;
        
        const userAddressTableFields = {
             address_id: addressId,
             user_id: userID,
             user_address_status: addressData.user_address_status,
             is_default: addressData.is_default
       }

       const userAddressTableKeys = Object.keys(userAddressTableFields).join(",")
       const userAddressTableValues = Object.values(userAddressTableFields)
       const userAddressTablePlaceholder = userAddressTableValues.map(()=>'?').join(',')

       const userAddressTableQuery = `insert into user_address (${userAddressTableKeys}) value (${userAddressTablePlaceholder})`
       const [userAddressTableResult] = await db.query(userAddressTableQuery, [...userAddressTableValues])

        return {
            addressTableResult, userAddressTableResult
        };

}


const updateUserAddressByUserId = async (userID: number, userAddressStatus: string, addressData: Record<string, unknown>) => {

    const userAddressColumns = new Set(["user_address_status", "is_default"]);

    const userAddressFields: Record<string, unknown> = {};
    const addressFields: Record<string, unknown> = {};

    for (const key in addressData) {
      if (userAddressColumns.has(key)) {
        userAddressFields[key] = addressData[key];
      } else {
        addressFields[key] = addressData[key];
      }
    }

    const userAddressSet = Object.keys(userAddressFields)
      .map((key) => `user_address.${key} = ?`)
      .join(", ");

    const addressSet = Object.keys(addressFields)
      .map((key) => `address.${key} = ?`)
      .join(", ");

    const setClause = [addressSet, userAddressSet]
      .filter(Boolean)
      .join(", ");

    if (!setClause) {
      throw new Error("No fields provided for update");
    }

    const values = [
      ...Object.values(addressFields),
      ...Object.values(userAddressFields),
    ];

    const query = `
      UPDATE address
      INNER JOIN user_address
      ON address.address_id = user_address.address_id
      SET ${setClause}
      WHERE user_address.user_id = ? 
      AND user_address.user_address_status = ?
    `;

    const [result] = await db.query<ResultSetHeader>(query, [ values, userID, userAddressStatus]);

    return result;

};

const deleteOneAddressByUserId = async (userID:number, userAddressStatus:string)=>{
    const query = `delete address from address 
     inner join user_address
     on address.address_id = user_address.address_id
    where user_id = ${userID} and user_address_status = ${userAddressStatus}`

    const [ result ] = await db.query<ResultSetHeader>(query,[userID, userAddressStatus])
    return result;
}


export {fetchAllAddress, fetchOneAddressByUserId, insertOneAddress, updateUserAddressByUserId, deleteOneAddressByUserId}