declare const importExcel: (excelFileUserData: any[]) => Promise<{
    summary: {
        totalRecords: number;
        successfullyImportedRecords: number;
        failedRecords: number;
    };
    failedFilePath: string;
}>;
export { importExcel };
//# sourceMappingURL=importUserExcelFileModel.d.ts.map