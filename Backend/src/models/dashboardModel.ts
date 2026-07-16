/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../config/dbConnection"

const fetchRecords = async () =>{
   const [totalUsers]:any = await db.query(`select count(*) as totalUsers from users`)
   const [totalCustomers]:any = await db.query(`select count(*) as totalCustomers from users where role = 'customer'`)
   const [totalSellers]:any = await db.query(`select count(*) as totalSellers from users where role = 'seller'`)
   const [totalProducts]:any = await db.query(`select count(*) as totalProducts from products`) 
    const [totalOrders]:any = await db.query(`select count(*) as totalOrders from orders ;`)
   const [totalRevenue]:any = await db.query(`select sum(price) as totalRevenue from order_items `)
   console.log('totalCustomers', totalCustomers)
    
   const flipkartRecords = {
     totalUsers: totalUsers[0].totalUsers,
     totalCustomers: totalCustomers[0].totalCustomers,
     totalSellers: totalSellers[0].totalSellers,
     totalProducts:totalProducts[0].totalProducts,
     totalOrders: totalOrders[0].totalOrders,
     totalRevenue: totalRevenue[0].totalRevenue
  };

  return flipkartRecords;
}

export default fetchRecords