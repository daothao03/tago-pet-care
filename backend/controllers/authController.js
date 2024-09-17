const userModel = require("../models/userModel");
const { responseReturn } = require("../utils/response");
const { createToken } = require("../utils/createToken");
const bcrypt = require("bcrypt");
const caregiverCustomerModel = require("../models/chat/caregiverCustomerModel");

class authController {
    login = async (req, res) => {
        const { email, password, role } = req.body;
        try {
            const user = await userModel.findOne({ email }).select("+password");
            if (user) {
                const match = await bcrypt.compare(password, user.password);

                if (match) {
                    // if (user.role !== role) {
                    //     return responseReturn(res, 403, {
                    //         error: "Unauthorized",
                    //     });
                    // }
                    if (!user.role.includes(role)) {
                        return responseReturn(res, 403, {
                            error: "Unauthorized",
                        });
                    }

                    const token = await createToken({
                        id: user.id,
                        role: user.role,
                    });
                    res.cookie("accessToken", token, {
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    });
                    responseReturn(res, 200, {
                        token,
                        message: "Login Success",
                    });
                } else {
                    responseReturn(res, 404, { error: "Password Wrong" });
                }
            } else {
                responseReturn(res, 404, { error: "Email not found" });
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    getInfo = async (req, res) => {
        const { id } = req;

        try {
            const userInfo = await userModel.findById(id).select("-password");

            responseReturn(res, 200, { userInfo: userInfo });
        } catch (error) {
            console.log(error.message);
        }
    };

    register = async (req, res) => {
        const { name, email, password } = req.body;

        try {
            const emailExist = await userModel.findOne({ email });
            if (emailExist) {
                responseReturn(res, 404, {
                    error: "Email Already Exist",
                });
            } else {
                const user = await userModel.create({
                    name,
                    email,
                    password: await bcrypt.hash(password, 10),
                    method: "normal",
                    isCaregiver: true,
                });
                await caregiverCustomerModel.create({
                    myId: user.id,
                });
                responseReturn(res, 200, {
                    message: "Register Successfully",
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    logout = async (req, res) => {
        try {
            res.cookie("accessToken", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            });
            responseReturn(res, 200, { message: "logout Success" });
        } catch (error) {
            responseReturn(res, 500, { error: error.message });
        }
    };
}

module.exports = new authController();
