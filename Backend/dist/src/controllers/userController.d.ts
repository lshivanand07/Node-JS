import { Request, Response, NextFunction } from "express";
declare const getUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getMyDetails: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const postUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const updateUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const deleteUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { getUsers, getMyDetails, postUsers, updateUsers, deleteUsers };
//# sourceMappingURL=userController.d.ts.map