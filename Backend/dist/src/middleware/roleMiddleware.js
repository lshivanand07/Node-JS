"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user = req.user;
        console.log(user.role);
        console.log(roles.includes(user.role));
        if (!roles.includes(user.role)) {
            return res.status(403).json({ message: "Forbidden: Access Denied" });
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
//# sourceMappingURL=roleMiddleware.js.map