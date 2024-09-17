const bcrypt = require("bcrypt");
const { responseReturn } = require("../../utils/response");
const userModel = require("../../models/userModel");
const caregiverCustomerModel = require("../../models/chat/caregiverCustomerModel");
const { createToken } = require("../../utils/createToken");

class authController {
    register = async (req, res) => {
        const { name, email, password } = req.body;
        try {
            const customer = await userModel.findOne({ email });
            if (customer) {
                responseReturn(res, 404, { error: "Email Already Exits" });
            } else {
                const createCustomer = await userModel.create({
                    name: name.trim(),
                    email: email.trim(),
                    password: await bcrypt.hash(password, 10),
                    method: "normal",
                    isCaregiver: false,
                });
                await caregiverCustomerModel.create({
                    myId: createCustomer.id,
                });
                responseReturn(res, 201, {
                    message: "User Register Success",
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const customer = await userModel
                .findOne({ email })
                .select("+password");
            if (customer) {
                const match = await bcrypt.compare(password, customer.password);
                if (match) {
                    const token = await createToken({
                        id: customer.id,
                        name: customer.name,
                        email: customer.email,
                        method: customer.method,
                    });
                    res.cookie("customerToken", token, {
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    });
                    responseReturn(res, 201, {
                        message: "User Login Success",
                        token,
                    });
                } else {
                    responseReturn(res, 404, { error: "Password Wrong" });
                }
            } else {
                responseReturn(res, 404, { error: "Email Not Found" });
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    logout = async (req, res) => {
        res.cookie("customerToken", "", {
            expires: new Date(Date.now()),
        });
        responseReturn(res, 200, { message: "Logout Success" });
    };
}

module.exports = new authController();
