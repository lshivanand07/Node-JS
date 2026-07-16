"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importExcelController = void 0;
const importUserExcelFileModel_1 = require("../models/importExcelFiles/importUserExcelFileModel");
const xlsx_1 = __importDefault(require("xlsx"));
const importExcelController = async (req, res, next) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const excelFile = req.file;
        if (!excelFile) {
            res.send('Excel file is require');
        }
        const workbook = xlsx_1.default.readFile(excelFile.path);
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) {
            return res.status(400).send("Sheet not found in Excel file");
        }
        const sheetData = workbook.Sheets[sheetName];
        if (!sheetData) {
            return res.status(400).send("Excel file is empty!");
        }
        const excelFileUserData = xlsx_1.default.utils.sheet_to_json(sheetData);
        if (excelFileUserData.length === 0) {
            return res.send('Excel file is empty');
        }
        const result = await (0, importUserExcelFileModel_1.importExcel)(excelFileUserData);
        res.status(201).send({ message: "Users excel file imported successfull", ...result });
    }
    catch (err) {
        return next(err);
    }
};
exports.importExcelController = importExcelController;
//# sourceMappingURL=importUserExcelFileControllers.js.map