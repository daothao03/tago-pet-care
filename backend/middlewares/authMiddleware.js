const jwt = require("jsonwebtoken");
const { responseReturn } = require("../utils/response");

module.exports.authMiddleware = async (req, res, next) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        responseReturn(res, 409, {
            message: "Please Login First",
        });
    } else {
        try {
            const decodeToken = await jwt.verify(
                accessToken,
                process.env.SECRET
            );
            req.role = decodeToken.role;
            req.id = decodeToken.id;
            next();
        } catch (error) {
            responseReturn(res, 409, {
                error: "Please Login",
            });
        }
    }
};
