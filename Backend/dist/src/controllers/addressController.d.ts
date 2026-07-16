import { Request, Response, NextFunction } from 'express';
declare const getAddress: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const createAddress: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const updateAddress: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const deleteAddress: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { getAddress, createAddress, updateAddress, deleteAddress };
//# sourceMappingURL=addressController.d.ts.map