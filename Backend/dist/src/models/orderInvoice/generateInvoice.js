"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoice = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const node_fs_1 = __importDefault(require("node:fs"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any 
const generateInvoice = (orderDataPDf) => {
    const filePath = `./src/models/orderInvoice/invoicePDF/order_${orderDataPDf.order_id}.pdf`;
    const doc = new pdfkit_1.default();
    doc.pipe(node_fs_1.default.createWriteStream(filePath));
    // Title
    doc.fontSize(20).text("Order Invoice", { align: "center" });
    doc.moveDown();
    // User Details
    const user = orderDataPDf.user_Details;
    doc.fontSize(12).text(`Customer ID: ${user.User_id || "N/A"}`);
    doc.fontSize(12).text(`Customer Name: ${user.user_name || "N/A"}`);
    doc.fontSize(12).text(`Customer Phone: ${user.phone || "N/A"}`);
    doc.fontSize(12).text(`Customer Email: ${user.email || "N/A"}`);
    doc.fontSize(12).text(`Customer address id: ${user.addressId || "N/A"}`);
    doc.text(`Order ID: ${orderDataPDf.order_id}`);
    doc.moveDown();
    // Items
    doc.text("Items:");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    orderDataPDf.items.forEach((item, index) => {
        doc.text(`${index + 1}. Product ID: ${item.product_id} | Qty: ${item.quantity}`);
    });
    doc.moveDown();
    // Amounts
    doc.text(`Tax: ${orderDataPDf.tax}%`);
    doc.text(`Total Amount: ${orderDataPDf.total_amount} RS`);
    doc.end();
    return filePath;
};
exports.generateInvoice = generateInvoice;
//# sourceMappingURL=generateInvoice.js.map