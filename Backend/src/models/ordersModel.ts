import { ResultSetHeader } from 'mysql2';
import {db} from '../../config/dbConnection';

const fetchAllOrders = async ()=>{
   const [rows] = await db.query(`select *, users.*, products.*, DATE_FORMAT(dob, '%d %M %Y') AS order_date from orders
    inner join order_items
    on orders.order_id = order_items.order_id
    inner join products
    on order_items.product_id = products.product_id
	inner join users
    on orders.user_id = users.user_id`)
   return rows
}

const fetchOrdersByUserId = async (userID:number,)=>{
    const query = `select *, address.*, DATE_FORMAT(dob, '%d %M %Y') AS order_date from orders
    inner join order_items
    on orders.order_id = order_items.order_id
    inner join products
    on order_items.product_id = products.product_id
	inner join address
    on orders.address_id = address.address_id
    left join product_discounts
    on order_items.product_id =  product_discounts.product_id
    where orders.user_id = ?`
  const [ rows ] = await db.query(query,[userID])
  return rows
}

const fetchOrderByOrderId = async (orderID:number,)=>{
    const query = `select * from orders where order_id = ?`
  const [ rows ] = await db.query(query,[orderID])
  return rows
}

const fetchOrdersByOrderStatus = async (orderStatus:string)=>{
    const query = `select * from orders
    inner join order_items
    on orders.order_id = order_items.order_id
    inner join products
    on order_items.product_id = products.product_id
    where order_status = ?`
  const [ rows ] = await db.query(query,[orderStatus])
  return rows
}

const individualProductOrder = async (productID:number)=>{
    const query = `select product_id, orders.* , quantity, price from order_items
     inner join orders on order_items.order_id = orders.order_id where product_id = ?`
  const [ rows ] = await db.query(query,[productID])
  return rows
}

const updateOrdersByUserId = async (userID:number, orderId:number,  ordersData:Record<string, unknown>)=>{
    
        const order_status = ordersData.order_status;
        const payment_status = ordersData.payment_status;
        
        console.log(userID, "  ", orderId)
        const query = `UPDATE orders INNER JOIN payments
                      ON orders.order_id = payments.order_id
                    SET orders.order_status = COALESCE(?, orders.order_status),
                    payments.payment_status = COALESCE(?, payments.payment_status)
                   WHERE user_id = ? AND payments.order_id = ? ;`
 
       const [result]  = await db.query<ResultSetHeader>(query,[order_status, payment_status, userID, orderId])
       return result
}

export {fetchAllOrders, fetchOrdersByOrderStatus, fetchOrdersByUserId, fetchOrderByOrderId, individualProductOrder, updateOrdersByUserId}