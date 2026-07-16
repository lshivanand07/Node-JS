/* eslint-disable @typescript-eslint/no-explicit-any */

import { ResultSetHeader } from 'mysql2/promise';
import {db} from '../../../config/dbConnection';
import fs from 'node:fs'

const importExcel = async (excelFileUserData:any [])=>{

     const totalRecords = excelFileUserData.length;
     let successfullyImportedRecords = 0;
     let failedRecords = 0;
     const failedRows: any[] = [];

     for (const user of excelFileUserData){
        if (!user.Name || !user.Email || !user.PhoneNumber || !user.Password || !user.Role || !user.Age || !user.Gender){
            failedRecords++
            failedRows.push({...user, reason: "Missing required fields"})
            continue;
        }

        const [rows]:any = await db.query('select * from users where email = ?',[user.Email])
        if(rows.length > 0){
           failedRecords++
           failedRows.push({...user,  reason: "Duplicate email"})
           continue
        }

        const userData = {
       user_name: user.Name,
       phone: user.PhoneNumber,
       email: user.Email,
       password: user.Password,
       role: user.Role,
       age: user.Age,
       gender: user.Gender,
      }

      const usersTableFieldsKeys = Object.keys(userData).join(",")
      const usersTableFieldsValue = Object.values(userData);
      const usersTableFieldsValuePlaceholder = usersTableFieldsValue.map(()=>'?').join(",")

       const usersTableQuery = `insert into users ( ${usersTableFieldsKeys} ) values ( ${usersTableFieldsValuePlaceholder} )`;
        await db.query<ResultSetHeader>(usersTableQuery,[...usersTableFieldsValue])
       
       successfullyImportedRecords++;
     }

     // exporting file
      let failedFilePath = "";

      if(failedRows.length > 0){
       failedFilePath = `./src/models/importExcelFiles/failed-records/failed-users-${Date.now()}.csv`

        let csvData ='Name,Email,PhoneNumber,Role,Age,Gender,Reason\n';
       
        failedRows.forEach((row)=>{
        csvData += `${row.Name || ""},${row.Email || ""},${row.PhoneNumber || ""},${row.Role || ""},${row.Age || ""},${row.Gender || ""},${row.reason}\n`; 
      })

      fs.writeFile(failedFilePath, csvData, (err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("created")
        }
      })
      }

    return {
    summary: {
         totalRecords: totalRecords,
         successfullyImportedRecords: successfullyImportedRecords,
         failedRecords: failedRecords
        },
    failedFilePath
      }

}

export {importExcel}