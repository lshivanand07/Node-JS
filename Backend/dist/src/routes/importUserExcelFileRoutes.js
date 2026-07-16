"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const importUserExcelFileControllers_1 = require("../controllers/importUserExcelFileControllers");
const upload = (0, multer_1.default)({
    dest: './src/models/importExcelFiles/uploads',
    limits: {
        fileSize: 8000000
    }
});
router.post('/import-excel-users-file', upload.single('file'), importUserExcelFileControllers_1.importExcelController);
//# sourceMappingURL=importUserExcelFileRoutes.js.map