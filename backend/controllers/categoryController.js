const { responseReturn } = require("../utils/response");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const slugify = require("slugify");
const categoryModel = require("../models/categoryModel");
const {
    mongo: { ObjectId },
} = require("mongoose");

class categoryController {
    addCategory = async (req, res) => {
        const form = formidable();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error("Form parse error:", err);
                responseReturn(res, 404, { error: "Something went wrong" });
            } else {
                const { name, type } = fields;
                let { image } = files;

                const errors = {};

                if (!type) {
                    errors.type = "Type is required";
                }

                if (!name || name.length < 3 || name.length > 50) {
                    errors.name =
                        "Name must be between 3 and 50 characters long";
                }

                if (!image || !image.filepath) {
                    errors.image = "No image file provided";
                } else {
                    const validImageTypes = [
                        "image/jpeg",
                        "image/png",
                        "image/gif",
                    ];
                    if (!validImageTypes.includes(image.mimetype)) {
                        errors.image =
                            "Invalid image type. Only jpg, png, and gif are allowed";
                    }

                    const maxFileSize = 5 * 1024 * 1024;
                    if (image.size > maxFileSize) {
                        errors.image = "Image size exceeds the limit of 5MB";
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
                    const result = await cloudinary.uploader.upload(
                        image.filepath,
                        {
                            folder: "PetCategories",
                        }
                    );

                    if (result) {
                        await categoryModel.create({
                            name,
                            image: result.url,
                            slug: slugify(name),
                            type,
                        });

                        responseReturn(res, 200, {
                            message: "Add Category Successfully",
                        });
                    } else {
                        responseReturn(res, 404, {
                            error: "Image Upload File",
                        });
                    }
                } catch (error) {
                    console.log(error);
                    return responseReturn(res, 500, {
                        error: "Something went wrong",
                    });
                }
            }
        });
    };

    getCategory = async (req, res) => {
        const { parPage, currentPage, searchValue, typeCate } = req.query;

        try {
            let skipPage = 0;

            if (parPage && currentPage) {
                skipPage = parseInt(parPage) * (parseInt(currentPage) - 1);
            }

            let query = {};

            if (searchValue) {
                query.$text = { $search: searchValue };
            }

            if (typeCate) {
                query.type = typeCate;
            }

            const categories = await categoryModel
                .find(query)
                .skip(skipPage)
                .limit(parseInt(parPage) || 0)
                .sort({ createdAt: -1 });

            const totalCategory = await categoryModel
                .find(query)
                .countDocuments();

            responseReturn(res, 200, {
                categories,
                totalCategory,
            });
        } catch (error) {
            console.log(error.message);
            responseReturn(res, 500, { message: "Server error" });
        }
    };

    getCategoryId = async (req, res) => {
        const { cateId } = req.params;

        try {
            const category = await categoryModel.findById(new ObjectId(cateId));

            responseReturn(res, 200, { category });
        } catch (error) {
            console.log(error.message);
        }
    };

    updateCategory = async (req, res) => {
        const form = formidable();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error("Form parse error:", err);
                responseReturn(res, 404, { error: "Something went wrong" });
            } else {
                const { oldImage, name, type, id } = fields;
                let { newImage } = files;

                try {
                    cloudinary.config({
                        cloud_name: process.env.cloud_name,
                        api_key: process.env.api_key,
                        api_secret: process.env.api_secret,
                        secure: true,
                    });

                    if (newImage) {
                        const oldImageId = oldImage
                            .split("/")
                            .pop()
                            .split(".")[0];

                        try {
                            await cloudinary.uploader.destroy(
                                `PetCategories/${oldImageId}`
                            );
                        } catch (removeError) {
                            console.error(
                                "Lỗi khi xóa ảnh cũ: ",
                                removeError.message
                            );
                        }

                        const result = await cloudinary.uploader.upload(
                            newImage.filepath,
                            {
                                folder: "PetCategories",
                            }
                        );
                        await categoryModel.findByIdAndUpdate(id, {
                            name,
                            type,
                            slug: slugify(name),
                            image: result.url,
                        });
                        responseReturn(res, 200, {
                            message: "Updated Successfully",
                        });
                    } else {
                        await categoryModel.findByIdAndUpdate(id, {
                            name,
                            type,
                            slug: slugify(name),
                            image: oldImage,
                        });
                        responseReturn(res, 200, {
                            message: "Updated Successfully",
                        });
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }
        });
    };

    updateChangeStatus = async (req, res) => {
        const { status, id } = req.body;

        try {
            await categoryModel.findByIdAndUpdate(id, {
                status,
            });
            responseReturn(res, 200, { message: "Update status successfully" });
        } catch (error) {
            console.log(error.message);
        }
    };

    deleteCategory = async (req, res) => {
        const { cateId } = req.params;

        try {
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true,
            });

            const category = await categoryModel.findById(cateId);
            if (!category) {
                return responseReturn(res, 404, {
                    message: "Category not found",
                });
            }

            const imageUrl = category.image;
            const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0];

            try {
                await cloudinary.uploader.destroy(`PetCategories/${publicId}`);
            } catch (removeError) {
                console.error("Lỗi khi xóa ảnh cũ: ", removeError.message);
                return responseReturn(res, 500, {
                    message: "Error deleting image from Cloudinary",
                });
            }

            await categoryModel.findByIdAndDelete(cateId);
            responseReturn(res, 200, { message: "Deleted Successfully" });
        } catch (error) {}
    };
}

module.exports = new categoryController();
