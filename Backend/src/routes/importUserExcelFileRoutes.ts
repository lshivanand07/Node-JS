import multer from 'multer'
import  express  from "express";
const router = express.Router()

import { importExcelController } from '../controllers/importUserExcelFileControllers'

const upload = multer({ 
    dest: './src/models/importExcelFiles/uploads', 
    limits: {
     fileSize: 8000000
    } 
});

router.post('/import-excel-users-file', upload.single('file'), importExcelController );

export { router }
