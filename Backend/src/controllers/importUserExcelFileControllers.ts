import {Request, Response, NextFunction } from 'express';
import { importExcel } from '../models/importExcelFiles/importUserExcelFileModel';
import xlsx from 'xlsx'

const importExcelController = async (req:Request, res:Response, next:NextFunction)=>{
   try{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const excelFile = (req as any).file;

    if(!excelFile){
        res.send('Excel file is require')
    }
    
    const workbook = xlsx.readFile(excelFile.path)
    const sheetName = workbook.SheetNames[0]

   if (!sheetName) {
   return res.status(400).send("Sheet not found in Excel file");
   }
    const sheetData = workbook.Sheets[sheetName];
   if (!sheetData) {
     return res.status(400).send("Excel file is empty!");
   }
     const excelFileUserData = xlsx.utils.sheet_to_json(sheetData)

     if(excelFileUserData.length === 0){
        return res.send('Excel file is empty')
     }

       const result =  await importExcel(excelFileUserData)
        res.status(201).send({message: "Users excel file imported successfull", ...result})
   }
   catch(err){
      return next(err)
   }
}

export { importExcelController }