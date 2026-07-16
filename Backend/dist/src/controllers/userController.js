"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsers = exports.updateUsers = exports.postUsers = exports.getMyDetails = exports.getUsers = void 0;
const userModel_1 = require("../models/userModel");
const getUsers = async (req, res, next) => {
    try {
        const userID = Number(req.params.userID);
        if (userID) {
            const rows = await (0, userModel_1.getOneUserByUserId)(userID);
            const data = [];
            data.push(rows);
            if (data[0].length === 0) {
                res.status(404).send("userID is Not Found");
            }
            else {
                res.status(200).send(data);
            }
        }
        else {
            const rows = await (0, userModel_1.getAllUser)();
            const data = [];
            data.push(rows);
            if (data.length === 0) {
                res.status(404).send("Data is Not Found");
            }
            else {
                res.status(200).send(data);
            }
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.getUsers = getUsers;
const getMyDetails = async (req, res, next) => {
    try {
        const userID = req.user.user_id;
        const rows = await (0, userModel_1.getUserInfo)(userID);
        const data = [];
        data.push(rows);
        if (data[0].length === 0) {
            res.status(404).send("userID is Not Found");
        }
        else {
            res.status(200).send(data);
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.getMyDetails = getMyDetails;
const postUsers = async (req, res, next) => {
    try {
        const userData = req.body;
        if (!userData.user_id || !userData.user_name || !userData.password) {
            res.status(400).send("id, name, password required");
            console.log("id, Name and password required");
        }
        else {
            const result = await (0, userModel_1.insertOneUser)(userData);
            res.status(201).send({ message: "User data has been successfully inserted.",
                data: result
            });
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.postUsers = postUsers;
const updateUsers = async (req, res, next) => {
    try {
        const userID = Number(req.params.userID);
        const userData = req.body;
        const result = await (0, userModel_1.updateOneUser)(userID, userData);
        if (result.affectedRows === 0) {
            res.status(404).send("UserID does not exist in the user table.");
        }
        else {
            res.status(200).send("Your Data is updated successfully");
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.updateUsers = updateUsers;
const deleteUsers = async (req, res, next) => {
    try {
        const userID = Number(req.params.userID);
        const result = await (0, userModel_1.deleteOneUser)(userID);
        if (result.affectedRows === 0) {
            res.status(404).send("userID does not exist in the user table.");
        }
        else {
            res.status(200).send("Your data is successfully deleted");
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.deleteUsers = deleteUsers;
//# sourceMappingURL=userController.js.map