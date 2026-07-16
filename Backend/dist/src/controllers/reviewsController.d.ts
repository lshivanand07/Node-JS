import { Request, Response, NextFunction } from "express";
declare const getReviews: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const createReviews: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const updateReviews: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const deleteReviews: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { getReviews, createReviews, updateReviews, deleteReviews };
//# sourceMappingURL=reviewsController.d.ts.map