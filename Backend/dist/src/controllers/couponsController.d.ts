import { Request, Response, NextFunction } from "express";
declare const getCoupons: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const createCoupons: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const createUserCoupons: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const updateCoupons: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { getCoupons, createCoupons, createUserCoupons, updateCoupons };
//# sourceMappingURL=couponsController.d.ts.map