import { Request, Response, NextFunction } from "express";
declare const loginUser: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export { loginUser };
//# sourceMappingURL=loginController.d.ts.map