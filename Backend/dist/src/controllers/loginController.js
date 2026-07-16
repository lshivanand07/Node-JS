"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginModel_1 = require("../models/loginModel");
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and password required");
        }
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userEmailPassword = await (0, loginModel_1.getUserLoginCredential)(email);
        if (!userEmailPassword.length) {
            return res.status(200).send({ message: "Email ID not registered." });
        }
        if (userEmailPassword[0].email === email && userEmailPassword[0].password === password) {
            const token = jsonwebtoken_1.default.sign({ user_email: userEmailPassword[0].email,
                user_id: userEmailPassword[0].User_id,
                user_role: userEmailPassword[0].role
            }, process.env.JWT_SECRET, { expiresIn: "7d" });
            res.status(200).json({ message: "Login successful",
                token: token,
                user: { user_email: userEmailPassword[0].email,
                    user_id: userEmailPassword[0].User_id,
                    user_role: userEmailPassword[0].role
                },
            });
        }
        else {
            return res.status(200).send({ message: 'Invalid email id and password ' });
        }
    }
    catch (err) {
        next(err);
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=loginController.js.map