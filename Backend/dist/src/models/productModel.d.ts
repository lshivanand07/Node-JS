import { ResultSetHeader } from 'mysql2/promise';
declare const fetchAllProducts: () => Promise<import("mysql2/promise").QueryResult>;
declare const fetchOneProductsByProductId: (productID: number) => Promise<import("mysql2/promise").QueryResult>;
declare const fetchProductDiscountByprodutId: (productID: number) => Promise<import("mysql2/promise").QueryResult>;
declare const fetchProductReviewsByprodutId: (productID: number) => Promise<import("mysql2/promise").QueryResult>;
declare const fetchProductImagesByprodutId: (productID: number) => Promise<import("mysql2/promise").QueryResult>;
declare const fetchProductBrandByprodutId: (productID: number) => Promise<import("mysql2/promise").QueryResult>;
declare const fetchProductVariantsByprodutId: (productID: number) => Promise<import("mysql2/promise").QueryResult>;
declare const insertProductData: (productData: any) => Promise<{
    productResult: ResultSetHeader;
    productDiscountResult: import("mysql2/promise").QueryResult;
    productImagesResult: import("mysql2/promise").QueryResult;
    productVariantsResults: any[];
}>;
declare const updateProductByProductId: (productID: number, productData: Record<string, unknown>) => Promise<{
    productTableResult: any;
    productDiscountsTableResult: any;
    productImageTableResult: any;
}>;
declare const deleteProductByProductId: (productID: number) => Promise<ResultSetHeader>;
export { fetchAllProducts, fetchOneProductsByProductId, fetchProductDiscountByprodutId, fetchProductReviewsByprodutId, fetchProductImagesByprodutId, fetchProductBrandByprodutId, fetchProductVariantsByprodutId, insertProductData, updateProductByProductId, deleteProductByProductId };
//# sourceMappingURL=productModel.d.ts.map