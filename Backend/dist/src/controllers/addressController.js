"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddress = exports.updateAddress = exports.createAddress = exports.getAddress = void 0;
const addressModel_1 = require("../models/addressModel");
const getAddress = async (req, res, next) => {
    try {
        const userID = req.user.user_id;
        if (userID) {
            const rows = await (0, addressModel_1.fetchOneAddressByUserId)(userID);
            const data = [];
            data.push(rows);
            if (data[0].length === 0) {
                res.status(404).send("userID Not Found");
            }
            else {
                res.status(200).send(data);
            }
        }
        else {
            const rows = await (0, addressModel_1.fetchAllAddress)();
            const data = [];
            data.push(rows);
            if (data.length === 0) {
                res.status(404).send("Address data Not Found");
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
exports.getAddress = getAddress;
const createAddress = async (req, res, next) => {
    try {
        const userID = req.user.user_id;
        const addressData = req.body;
        if (!addressData.country || !addressData.state || !addressData.districts
            || !addressData.city || !addressData.street || !addressData.landmark || !addressData.pincode) {
            res.status(400).send("address_id, country, state, districts, city, street, landmark and pincode are required");
        }
        else {
            const result = await (0, addressModel_1.insertOneAddress)(userID, addressData);
            res.status(201).send({ message: "address data has been successfully uploaded.",
                data: result
            });
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.createAddress = createAddress;
const updateAddress = async (req, res, next) => {
    try {
        const userID = req.user.user_id;
        const userAddressStatus = req.params.userAddressStatus;
        const addressData = req.body;
        const result = await (0, addressModel_1.updateUserAddressByUserId)(userID, userAddressStatus, addressData);
        if (result.affectedRows === 0) {
            res.status(404).send("address Id Not Found");
        }
        else {
            res.status(200).send("address Data Updated Successfully");
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.updateAddress = updateAddress;
const deleteAddress = async (req, res, next) => {
    try {
        const userID = req.user.user_id;
        const userAddressStatus = req.params.userAddressStatus;
        const result = await (0, addressModel_1.deleteOneAddressByUserId)(userID, userAddressStatus);
        if (result.affectedRows === 0) {
            res.status(404).send("address Id Not Found");
        }
        else {
            res.status(200).send("address Data Deleted Successfully");
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.deleteAddress = deleteAddress;
//# sourceMappingURL=addressController.js.map