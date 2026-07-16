/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { db } from "../../config/dbConnection";
import fs from "node:fs";

const downloadInvoice = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderID;
    const userId = (req as any).user.user_id;

    const [rows]: any = await db.query(`SELECT invoice_path, user_id FROM orders WHERE order_id = ?`,[orderId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const order = rows[0];

    if (order.user_id !== userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const filePath = order.invoice_path;

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Invoice file not found" });
    }

    return res.download(filePath, `invoice_${orderId}.pdf`);

  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { downloadInvoice };