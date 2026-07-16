"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const autoMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
        return res.status(401).send("Token missing");
    }
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).send("Token missing");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = {
            user_id: decoded.user_id,
            email: decoded.user_email,
            role: decoded.user_role
        };
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(403).send("Invalid or expired token");
    }
};
exports.autoMiddleware = autoMiddleware;
//# sourceMappingURL=authorization.js.map