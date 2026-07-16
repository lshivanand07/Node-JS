import { ResultSetHeader } from 'mysql2/promise';
import {db} from '../../config/dbConnection'

const fetchReturnStatus = async (orderID:number)=>{
    const query = `select returns.* from returns inner join order_items
        on returns.order_item_id = order_items.order_item_id
       where order_id = ?`
     const [rows] = await db.query(query,[orderID])
     return rows
}

const fetchRefundStatus = async (orderID:number)=>{
    const query = `select refunds.* from refunds 
inner join returns
on refunds.return_id = returns.return_id
inner join order_items
	on returns.order_item_id = order_items.order_item_id
       where order_id = ?`
     const [rows] = await db.query(query,[orderID])
     return rows
}

const insertReturnOrders = async(returnOrderData:Record<string, unknown>)=>{

    const orderId = returnOrderData.orderId
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [orderItemIdArray]:any = await db.query("select order_item_id from order_items where order_id = ?",[orderId])
    const orderItemId = orderItemIdArray[0].order_item_id
    const returnTableFields = {
        reason: returnOrderData.reason,
        order_item_id: orderItemId
    }

   const returnTableKeys = Object.keys(returnTableFields).join(',');  
   const returnTableValues = Object.values(returnTableFields);
   const returnTablePlaceholder = returnTableValues.map(()=>'?').join(',')
   
   const returnTableQuery = `insert into returns (${returnTableKeys}) value (${returnTablePlaceholder})`
   const [result] = await db.query(returnTableQuery,[...returnTableValues])
    return result
}

const updateReturnOrder = async(orderID:number, returnOrderData:Record<string, unknown>)=>{

   const return_status = returnOrderData.return_status;
const [returnStatusResult] = await db.query<ResultSetHeader>(`UPDATE returns INNER JOIN order_items
                       ON returns.order_item_id = order_items.order_item_id  
                       SET returns.return_status = ? 
                        WHERE order_items.order_id = ? `,
            [return_status, orderID]
);

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
const [totalAmountArray]: any = await db.query<ResultSetHeader>( `SELECT total_amount FROM orders INNER JOIN order_items 
             ON orders.order_id = order_items.order_id WHERE order_items.order_id = ?`,
              [orderID]
);

const totalAmount = totalAmountArray[0].total_amount;
let refundResult = null;
if (return_status === 'received') {

    //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [returnRows]: any = await db.query<ResultSetHeader>(`select return_id from returns inner join order_items
    on returns.order_item_id = order_items.order_item_id where order_id = ?`,
    [orderID]
  );

  const returnId = returnRows[0].return_id;
  const [refundData] = await db.query<ResultSetHeader>(
    "INSERT INTO refunds (return_id, amount) VALUES (?, ?)",
    [returnId, totalAmount]
  ); 
  refundResult = refundData;
}

  return{
    returnStatusResult, refundResult
  }
}

const updateRefunds = async(orderID:number, refundData:Record<string, unknown>)=>{
   
        const refundSatus = refundData.refund_status

        const query = `update refunds inner join
          returns on refunds.return_id = returns.return_id
      inner join order_items
      on returns.order_item_id = order_items.order_item_id
        set refund_status = ? where order_id = ?`
      const [result] = await db.query<ResultSetHeader>(query, [refundSatus, orderID])

     const refundStatusQuery = `select refund_status from refunds inner join returns
          on refunds.return_id = returns.return_id inner join order_items
	       on returns.order_item_id = order_items.order_item_id where order_id = ?`

           //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const [refundStatusResult]:any = await db.query(refundStatusQuery, [orderID])
         if (refundStatusResult.length === 0) {
            // not refund found
            return null; 
          }
        const refundStatus = refundStatusResult[0].refund_status;
        
        let refundResult = null;
        if(refundStatus === 'success'){
            const query = `UPDATE returns INNER JOIN order_items ON returns.order_item_id = order_items.order_item_id  
                         SET return_status = ? WHERE order_items.order_id = ?`

        const [result] = await db.query(query, ['refunded', orderID])
           refundResult = result
        }

     return {
      result, refundResult
     };

}

export { fetchReturnStatus, fetchRefundStatus, insertReturnOrders, updateReturnOrder, updateRefunds}