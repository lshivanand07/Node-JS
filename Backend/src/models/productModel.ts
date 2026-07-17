import { ResultSetHeader } from 'mysql2/promise';
import {db} from '../../config/dbConnection';

const fetchAllProducts =  async ()=>{
     const [rows] = await db.query(`SELECT * FROM products
inner join product_images on products.product_id = product_images.product_id 
inner join product_discounts on products.product_id = product_discounts.product_id`)

await db.query('UPDATE products SET admin_viewed = TRUE WHERE admin_viewed = FALSE')
     return rows;
    }

const fetchOneProductsByProductId = async (productID:number)=>{
    const [rows] = await db.query(`select * from products
inner join product_images
on products.product_id = product_images.product_id
inner join  product_variants 
on products.product_id = product_variants.product_id 
where product_variants.product_id = ?`,[productID])
    return rows;
    }

const fetchProductDiscountByprodutId = async (productID:number)=>{
     const [rows] = await db.query("select * from product_discounts where product_id = ?",[productID])
     return rows;
    }


const fetchProductReviewsByprodutId = async (productID:number)=>{
    const [rows] = await db.query("select * from reviews where product_id = ?",[productID])
    return rows;
    }

const fetchProductImagesByprodutId = async (productID:number)=>{
     const [rows] = await db.query("select * from product_images where product_id = ?",[productID])
     return rows;
    }

const fetchProductBrandByprodutId = async (productID:number)=>{
    const query = `select product_id, product_name, brand.brand_id, brand_name from brand
     inner join products
     on brand.brand_id = products.brand_id
       where product_id = ?`
     const [rows] = await db.query(query,[productID])
     return rows;
    }

const fetchProductVariantsByprodutId = async (productID:number)=>{
    const query = `select product_id, product_name, categories.* from categories
    inner join products
    on categories.category_id = products.category_id
     where product_id = ?`
     const [rows] = await db.query(query,[productID])
     return rows;
    }

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const insertProductData = async (productData:any)=>{

    const productTableFields={
        product_name: productData.product_name,
        description: productData.description,
        seller_id: productData.seller_id
    }

    const productTableKeys = Object.keys(productTableFields).join(",")
    const productTableValues = Object.values(productTableFields)
    const productTablePlaceholders = productTableValues.map(()=>'?').join(",")

   const productQuery = `insert into products ( ${productTableKeys} ) values ( ${productTablePlaceholders} )`
   const [productResult] = await db.query<ResultSetHeader>(productQuery, [...productTableValues])

    const product_id = productResult.insertId

    const productDiscountsTableFields={
        discount_percentage: productData.discount.discount_percentage,
        start_date: productData.discount.start_date,
        end_date: productData.discount.end_date,
        product_id: product_id
       }

     const productDiscountsTableKeys = Object.keys(productDiscountsTableFields).join(",")
    const productDiscountsTableValues = Object.values(productDiscountsTableFields)
    const productDiscountsTablePlaceholders = productDiscountsTableValues.map(()=>'?').join(",")

   const productDiscountQuery = `insert into product_discounts ( ${productDiscountsTableKeys} ) values ( ${productDiscountsTablePlaceholders} )`
    const [ productDiscountResult ]= await db.query(productDiscountQuery, [...productDiscountsTableValues])

       const productImagesTableFields={
        image_url: productData.image_url,
        product_id: product_id
       }

       const productImagesTableKeys = Object.keys(productImagesTableFields).join(",")
    const productImagesTableValues = Object.values(productImagesTableFields)
    const productImagesTablePlaceholders = productImagesTableValues.map(()=>'?').join(",")

   const productImagesQuery = `insert into product_images ( ${productImagesTableKeys} ) values ( ${productImagesTablePlaceholders} )`
    const [ productImagesResult ]= await db.query(productImagesQuery, [...productImagesTableValues])

     //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const productVariantsResults: any[] = [];
    for(const variants of productData.variants){
        
         const productVariantsTableFields={
        size: variants.size,
        color: variants.color,
        price: variants.price,
        stock: variants.stock,
        product_id: product_id
       }
       
         const productVariantsKeys = Object.keys(productVariantsTableFields).join(",")
    const productVariantsValues = Object.values(productVariantsTableFields)
    const productVariantsPlaceholders = productVariantsValues.map(()=>'?').join(",")

    const productVariantsQuery = `insert into product_variants (${productVariantsKeys}) values (${productVariantsPlaceholders})`
    const result = await db.query(productVariantsQuery,[...productVariantsValues])
     productVariantsResults.push(result);

    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [stockResult]: any = await db.query(`SELECT SUM(stock) as totalStock FROM product_variants WHERE product_id = ?`,[product_id]);
    await db.query(`UPDATE products SET stock = stock + ? WHERE product_id = ?`,[stockResult[0].totalStock, product_id]);

    return {
        productResult, productDiscountResult, productImagesResult, productVariantsResults
    }
}

const updateProductByProductId = async(productID:number, productData:Record <string, unknown>)=>{

    const productImageColumn = new Set(['image_url'])
    const productDiscountsColumn = new Set(['discount_percentage', 'start_date', 'end_date', ])
    
    const productImageFields:Record<string, unknown>  = {}
    const productDiscountsFields:Record<string, unknown>  = {}
    const productFields:Record<string, unknown> = {}

    for(const key in productData){
        if(productImageColumn.has(key)){
         productImageFields[key] = productData[key]
        }else if(productDiscountsColumn.has(key)){
            productDiscountsFields[key] = productData[key]
        }else{
          productFields[key] =  productData[key]
        }
    }

     //eslint-disable-next-line @typescript-eslint/no-explicit-any
    let productTableResult: any; let productDiscountsTableResult: any;  let productImageTableResult: any;

    const productTableKeys = Object.keys(productFields)
   .map((productTableKeys)=>`${productTableKeys}=?`).join(',')
   const productTableVlaue = Object.values(productFields)
     if(productTableKeys.length > 0){
       [productTableResult] = await db.query<ResultSetHeader>(`update products set ${ productTableKeys } where product_id = ? `, [...productTableVlaue, productID])
    }

    const productDiscountsTableKeys = Object.keys(productDiscountsFields)
   .map((productDiscountsTableKeys)=>`${productDiscountsTableKeys}=?`).join(',')
   const productDiscountsTableVlaue = Object.values(productDiscountsFields)
    if(productDiscountsTableKeys.length > 0){
     [productDiscountsTableResult] = await db.query<ResultSetHeader>(`update product_discounts set ${ productDiscountsTableKeys } where product_id = ? `, [...productDiscountsTableVlaue, productID])
    }

    const productImageTableKeys = Object.keys(productImageFields)
   .map((productImageTableKeys)=>`${productImageTableKeys}=?`).join(',')
   const productImageTableVlaue = Object.values(productImageFields)
    if(productImageTableKeys.length > 0){
     [productImageTableResult] = await db.query<ResultSetHeader>(`update product_images set ${ productImageTableKeys } where product_id = ? `, [...productImageTableVlaue, productID])
    }
     
    return {
        productTableResult, productDiscountsTableResult, productImageTableResult
    }
}

const deleteProductByProductId = async (productID:number)=>{
    const [result] = await db.query<ResultSetHeader>('delete from products where product_id = ?',[productID])
    return result
}

 export {fetchAllProducts, fetchOneProductsByProductId, fetchProductDiscountByprodutId
        , fetchProductReviewsByprodutId, fetchProductImagesByprodutId, fetchProductBrandByprodutId,
        fetchProductVariantsByprodutId, insertProductData, updateProductByProductId, deleteProductByProductId 
      }
