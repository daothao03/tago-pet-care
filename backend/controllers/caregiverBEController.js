const { responseReturn } = require("../utils/response");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const slugify = require("slugify");
const {
    mongo: { ObjectId },
} = require("mongoose");
const userModel = require("../models/userModel");
const caregiverProfileModel = require("../models/caregiverProfileModel");

class caregiverBEController {
    get_caregiver_request = async (req, res) => {
        const { parPage, currentPage, searchValue } = req.query;

        const skipPage = parseInt(parPage) * (parseInt(currentPage) - 1);

        try {
            if (searchValue) {
                const caregivers = await userModel
                    .find({
                        isCaregiver: true,
                        status: "pending",
                        $text: searchValue,
                    })
                    .skip(skipPage)
                    .limit(parPage)
                    .sort({ createdAt: -1 });
                const totalCaregiver = await userModel
                    .find({
                        isCaregiver: true,
                        $text: searchValue,
                    })
                    .countDocuments();

                responseReturn(res, 200, { caregivers, totalCaregiver });
            } else {
                const caregivers = await userModel
                    .find({
                        isCaregiver: true,
                        status: "pending",
                    })
                    .skip(skipPage)
                    .limit(parPage)
                    .sort({ createdAt: -1 });
                const totalCaregiver = await userModel
                    .find({
                        isCaregiver: true,
                    })
                    .countDocuments();

                responseReturn(res, 200, { caregivers, totalCaregiver });
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    get_caregiver_info = async (req, res) => {
        const { careId } = req.params;

        try {
            const caregiverProfile = await caregiverProfileModel
                .findOne({
                    caregiverId: careId,
                })
                .populate("caregiverId")
                .exec();
            responseReturn(res, 200, { caregiverProfile });
        } catch (error) {
            console.log(error.message);
        }
    };

    update_role_status = async (req, res) => {
        const { status, careId } = req.body;

        try {
            const updatedUser = await userModel.findByIdAndUpdate(
                careId,
                {
                    status: status,

                    $addToSet: { role: "caregiver" },
                },
                { new: true }
            );

            // if (!updatedUser) {
            // 	responseReturn(res, 200, {error: "User Not Found"})
            // }
            responseReturn(res, 200, { message: "Update Status Successfully" });
        } catch (error) {
            console.log(error.message);
        }
    };

    update_profile = async (req, res) => {
        const form = formidable({ multiples: true });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res
                    .status(400)
                    .json({ error: "Error parsing form data" });
            }

            const {
                name,
                email,
                phone,
                businessForm,
                address,
                serviceArea,
                introduce,
                experience,
                shopName,
                careId,
                oldImage,
                oldProfileImage,
            } = fields;

            let { newImage, newProfileImage } = files;

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
            if (!shopName) {
                errors.shopName = "Address is required";
            }

            if (
                !serviceArea ||
                !Array.isArray(JSON.parse(serviceArea)) ||
                JSON.parse(serviceArea).length < 1
            ) {
                errors.serviceArea = "Service area is required";
            }

            if (!introduce) {
                errors.introduce = "Introduction is required";
            }

            if (!experience) {
                errors.experience = "Experience is required";
            }

            if (Object.keys(errors).length > 0) {
                return res.status(400).json({ errors });
            }

            try {
                cloudinary.config({
                    cloud_name: process.env.cloud_name,
                    api_key: process.env.api_key,
                    api_secret: process.env.api_secret,
                    secure: true,
                });
                const certificateCurrent = await caregiverProfileModel.findOne({
                    caregiverId: new ObjectId(careId),
                });

                const updatedCertificates =
                    certificateCurrent.certificates.filter((certificate) => {
                        if (Array.isArray(oldImage)) {
                            return !oldImage.includes(certificate);
                        } else {
                            return certificate !== oldImage;
                        }
                    });

                // console.log(updatedCertificates);

                for (const certificate of updatedCertificates) {
                    const oldImageId = certificate
                        .split("/")
                        .pop()
                        .split(".")[0];
                    try {
                        await cloudinary.uploader.destroy(
                            `petProfile/${oldImageId}`
                        );
                    } catch (removeError) {
                        console.error(
                            "Lỗi khi xóa ảnh cũ: ",
                            removeError.message
                        );
                    }
                }

                let newImageUrls = [];
                if (Array.isArray(newImage)) {
                    for (const img of newImage) {
                        if (img && img.filepath) {
                            const result = await cloudinary.uploader.upload(
                                img.filepath,
                                {
                                    folder: "petProfile",
                                }
                            );
                            newImageUrls.push(result.url);
                        }
                    }
                } else if (newImage && newImage.filepath) {
                    const result = await cloudinary.uploader.upload(
                        newImage.filepath,
                        {
                            folder: "petProfile",
                        }
                    );
                    newImageUrls.push(result.url);
                }
                const oldImageArray = Array.isArray(oldImage)
                    ? oldImage.filter(Boolean)
                    : oldImage
                    ? [oldImage]
                    : [];

                const finalCertificates = [
                    ...newImageUrls,
                    ...oldImageArray,
                ].filter(Boolean);

                if (newProfileImage) {
                    if (oldProfileImage) {
                        const oldImageId = oldProfileImage
                            .split("/")
                            .pop()
                            .split(".")[0];

                        try {
                            await cloudinary.uploader.destroy(
                                `petProfile/${oldImageId}`
                            );
                        } catch (removeError) {
                            console.error(
                                "Lỗi khi xóa ảnh cũ: ",
                                removeError.message
                            );
                        }
                    }
                    const resultProfileImage = await cloudinary.uploader.upload(
                        newProfileImage.filepath,
                        {
                            folder: "petProfile",
                        }
                    );
                    await userModel.findByIdAndUpdate(careId, {
                        name,
                        email,
                        image: resultProfileImage.url,
                    });
                }

                await caregiverProfileModel.findOneAndUpdate(
                    { caregiverId: new ObjectId(careId) },
                    {
                        phone,
                        businessForm,
                        address,
                        serviceArea: Array.isArray(serviceArea)
                            ? serviceArea
                            : JSON.parse(serviceArea),
                        introduce,
                        experience,
                        shopName,
                        certificates: finalCertificates,
                    }
                );
                responseReturn(res, 200, {
                    message: "Update Profile Successfully",
                });
            } catch (error) {
                console.log(error.message);
            }
        });
    };
}

module.exports = new caregiverBEController();
