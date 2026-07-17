import { Request,Response, NextFunction } from "express";
import { fetchAllProducts, fetchOneProductsByProductId, fetchProductDiscountByprodutId
        , fetchProductReviewsByprodutId, fetchProductImagesByprodutId, fetchProductBrandByprodutId,
        fetchProductVariantsByprodutId, insertProductData, updateProductByProductId, deleteProductByProductId
} from "../models/productModel";


const getProducts = async (req:Request, res:Response, next:NextFunction)=>{
      try{
         const productID = Number(req.params.productID)
            if(productID){
            const rows =  await fetchOneProductsByProductId(productID)
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data:any[] = []
            data.push(rows)
            if(data[0].length === 0){
                  res.status(404).send("productID is not found")
            }else{
            console.log("data", data)
                  const product = {
        product_id: data[0][0].product_id,
        product_name: data[0][0].product_name,
        description: data[0][0].description,
        image_url: data[0][0].image_url,
        variants: data[0].map((item:any) => ({
            variant_id: item.variant_id,
            size: item.size,
            color: item.color,
            price: item.price,
            stock: item.stock,
        })),
    };
    console.log("product", product)
                  res.status(200).send(product)
            }
            }else{
            const rows =  await fetchAllProducts()
               res.status(200).send(rows) 
            }
      }
      catch(err){
            return next(err)
      }
}

const getProductDiscount = async (req:Request, res:Response, next:NextFunction)=>{
      try{
            const productID = Number(req.params.productID)
         const rows = await fetchProductDiscountByprodutId(productID)
        
           //eslint-disable-next-line @typescript-eslint/no-explicit-any
         const data:any[] = []
            data.push(rows)
            if(data[0].length === 0){
                  res.status(404).send("productID is not found")
            }else{
                  res.status(200).send(data)
            }
      }
      catch(err){
            return next(err)
      }
}

const getProductReviews = async (req:Request, res:Response, next:NextFunction)=>{
      try{
            const productID = Number(req.params.productID)
         const rows = await fetchProductReviewsByprodutId(productID)
           
           //eslint-disable-next-line @typescript-eslint/no-explicit-any
         const data:any[] = []
            data.push(rows)
            if(data[0].length === 0){
                  res.status(404).send("productID is not found")
            }else{
                  res.status(200).send(data)
            }
      }
      catch(err){
            return next(err)
      }
}

const getProductImages = async (req:Request, res:Response, next:NextFunction)=>{
      try{
            const productID = Number(req.params.productID)
         const rows = await fetchProductImagesByprodutId(productID)
         
           //eslint-disable-next-line @typescript-eslint/no-explicit-any
         const data:any[] = []
            data.push(rows)
            if(data[0].length === 0){
                  res.status(404).send("productID is not found")
            }else{
                  res.status(200).send(data)
            }
      }
      catch(err){
            return next(err)
      }
}

const getProductBrand = async (req:Request, res:Response, next:NextFunction)=>{
      try{
            const productID = Number(req.params.productID)
         const rows = await fetchProductBrandByprodutId(productID)
         
           //eslint-disable-next-line @typescript-eslint/no-explicit-any
         const data:any[] = []
            data.push(rows)
            if(data[0].length === 0){
                  res.status(404).send("productID is not found")
            }else{
                  res.status(200).send(data)
            }
      }
      catch(err){
            return next(err)
      }
}

const getProductVariants = async (req:Request, res:Response, next:NextFunction)=>{
      try{
            const productID = Number(req.params.productID)
         const rows = await fetchProductVariantsByprodutId(productID)

           //eslint-disable-next-line @typescript-eslint/no-explicit-any
         const data:any[] = []
            data.push(rows)
            if(data[0].length === 0){
                  res.status(404).send("productID is not found")
            }else{
                  res.status(200).send(data)
            }
      }
      catch(err){
            return next(err)
      }
}


const createProducts = async (req:Request, res:Response, next:NextFunction)=>{
      try{
             const productData = req.body;
            const result = await insertProductData(productData)
            res.status(201).send({message: "Product data has been successfully uploaded.",
                                  data:result
                                })

      }
      catch(err){
            return next(err)
      }
}

const updateProduct = async(req:Request, res:Response, next:NextFunction)=>{
      try{
           const productID = Number(req.params.productID)
           const productData = req.body;
          const result = await updateProductByProductId(productID, productData)

          const productRows = result.productTableResult.affectedRows ?? 0;
          const discountRows = result.productDiscountsTableResult?.affectedRows ?? 0;
          const imageRows = result.productImageTableResult?.affectedRows ?? 0;

          if(productRows === 0 && discountRows === 0 && imageRows === 0){
            res.status(404).send("product Id Not Found")
          }else{
            res.status(200).send("Product Data Updated Successfully") 
          }
      }
      catch(err){
            return next(err)
      }
}

const deleteProduct = async(req:Request, res:Response, next:NextFunction)=>{
   try{
       const productID = Number(req.params.productID)
       const result = await deleteProductByProductId(productID)
       if(result.affectedRows === 0){
            res.status(404).send("productID is Not Found")
       }else{
            res.status(200).send("product data delete successfull")
       }
   }
   catch(err){
      return next(err)
   }
}

export {getProducts, getProductDiscount, getProductReviews, getProductImages, 
      getProductBrand, getProductVariants, createProducts, updateProduct, deleteProduct}