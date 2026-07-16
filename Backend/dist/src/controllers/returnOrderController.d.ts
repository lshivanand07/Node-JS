import { Request, Response, NextFunction } from 'express';
declare const getReturnStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getRefundStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const createReturnOrders: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const updateReturnStatusByOrderID: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const updateRefundsStatusOrderID: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { getReturnStatus, getRefundStatus, createReturnOrders, updateReturnStatusByOrderID, updateRefundsStatusOrderID };
//# sourceMappingURL=returnOrderController.d.ts.map