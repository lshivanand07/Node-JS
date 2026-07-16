import { Request, Response, NextFunction } from 'express';
declare const autoMiddleware: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export { autoMiddleware };
//# sourceMappingURL=authorization.d.ts.map