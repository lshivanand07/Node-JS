import { Request, Response, NextFunction } from "express";
declare const getOrders: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getAllOrders: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const updateOrders: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { getOrders, getAllOrders, updateOrders };
//# sourceMappingURL=ordersController.d.ts.map