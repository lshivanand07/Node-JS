"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const error = (err, req, res, next) => {
    res.status(500).send({ message: err.message || "Internal server error" });
    console.log("ERROR is: ", err.message);
};
exports.error = error;
//# sourceMappingURL=errorHandler.js.map