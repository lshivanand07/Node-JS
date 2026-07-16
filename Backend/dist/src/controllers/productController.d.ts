import { Request, Response, NextFunction } from "express";
declare const getProducts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getProductDiscount: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getProductReviews: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getProductImages: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getProductBrand: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getProductVariants: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const createProducts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const updateProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const deleteProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { getProducts, getProductDiscount, getProductReviews, getProductImages, getProductBrand, getProductVariants, createProducts, updateProduct, deleteProduct };
//# sourceMappingURL=productController.d.ts.map