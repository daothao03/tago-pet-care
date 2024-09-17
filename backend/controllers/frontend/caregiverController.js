const { responseReturn } = require("../../utils/response");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const {
    mongo: { ObjectId },
} = require("mongoose");
const userModel = require("../../models/userModel");
const caregiverProfileModel = require("../../models/caregiverProfileModel");

class categoryController {
    caregiverRequest = async (req, res) => {
        const form = formidable({ multiples: true });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return responseReturn(res, 400, {
                    message: "Error parsing form",
                });
            } else {
                const {
                    email,
                    phone,
                    businessForm,
                    address,
                    serviceArea,
                    reasons,
                    experience,
                    cusId,
                } = fields;
                let { images } = files;

                const errors = {};
                const phoneRegex = /^0\d{9}$/;
                if (!phone) {
                    errors.phone = "Phone number is required";
                } else if (!phoneRegex.test(phone)) {
                    errors.phone =
                        "Invalid phone number. It should be 10 digits long and start with 0";
                }
                if (!businessForm) {
                    errors.businessForm = "Business form is required";
                }
                if (!address) {
                    errors.address = "Address is required";
                }

                if (
                    !serviceArea ||
                    !Array.isArray(JSON.parse(serviceArea)) ||
                    JSON.parse(serviceArea).length < 1
                ) {
                    errors.serviceArea = "Service area is required";
                }

                if (!reasons) {
                    errors.reasons =
                        "Reasons for becoming a caregiver are required";
                }
                if (!experience) {
                    errors.experience = "Experience is required";
                }

                if (!images || (Array.isArray(images) && images.length === 0)) {
                    errors.images = "No images provided";
                } else {
                    if (!Array.isArray(images)) {
                        images = [images];
                    }
                }
                if (Object.keys(errors).length > 0) {
                    return responseReturn(res, 400, { errors });
                }
                cloudinary.config({
                    cloud_name: process.env.cloud_name,
                    api_key: process.env.api_key,
                    api_secret: process.env.api_secret,
                    secure: true,
                });
                try {
                    const checked = await userModel.findOne({ email });
                    if (checked.role === "caregiver") {
                        return responseReturn(res, 400, {
                            message:
                                "This email is already associated with a caregiver account.",
                        });
                    } else {
                        await userModel.findByIdAndUpdate(new ObjectId(cusId), {
                            isCaregiver: true,
                        });
                        let allImageUrl = [];
                        for (let i = 0; i < images.length; i++) {
                            if (images[i] && images[i].filepath) {
                                const result = await cloudinary.uploader.upload(
                                    images[i].filepath,
                                    {
                                        folder: "petProfile",
                                    }
                                );
                                allImageUrl = [...allImageUrl, result.url];
                                // console.log(`Image ${i + 1} uploaded`);
                            }
                        }
                        await caregiverProfileModel.create({
                            caregiverId: cusId,
                            phone,
                            businessForm,
                            address,
                            serviceArea: JSON.parse(serviceArea),
                            reasons,
                            experience,
                            certificates: allImageUrl,
                        });
                        responseReturn(res, 201, {
                            message: "Sent Successfully",
                        });
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }
        });
    };

    getInfoCaregiver = async (req, res) => {
        const { userId } = req.params;

        try {
            const caregiverProfile = await caregiverProfileModel
                .findOne({
                    caregiverId: userId,
                })
                .populate("caregiverId")
                .exec();
            responseReturn(res, 200, { caregiverProfile });
        } catch (error) {
            console.log(error.message);
        }
    };
}

module.exports = new categoryController();
