const { responseReturn } = require("../utils/response");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const slugify = require("slugify");
const {
    mongo: { ObjectId },
} = require("mongoose");
const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");

class productController {
    add_product = async (req, res) => {
        const form = formidable({ multiples: true });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return responseReturn(res, 400, {
                    message: "Error parsing form",
                });
            } else {
                const {
                    caregiverId,
                    name,
                    category,
                    brand,
                    price,
                    stock,
                    discount,
                    short_description,
                    long_description,
                } = fields;
                let { images } = files;

                cloudinary.config({
                    cloud_name: process.env.cloud_name,
                    api_key: process.env.api_key,
                    api_secret: process.env.api_secret,
                    secure: true,
                });

                const errors = {};

                if (!name) {
                    errors.name = "Name is required";
                }
                if (!category) {
                    errors.category = "category is required";
                }
                if (!brand) {
                    errors.brand = "brand is required";
                }
                if (!short_description) {
                    errors.short_description = "short_description is required";
                }
                if (!long_description) {
                    errors.long_description = "long_description is required";
                }
                if (!price) {
                    errors.price = "Price is required";
                } else if (isNaN(price)) {
                    errors.price = "Price must be a number";
                }
                if (!stock) {
                    errors.stock = "Stock is required";
                } else if (isNaN(stock)) {
                    errors.stock = "Stock must be a number";
                }

                if (!discount) {
                    errors.discount = "Discount is required";
                } else if (isNaN(discount)) {
                    errors.discount = "Discount must be a number";
                }
                if (discount < 0 || discount > 100) {
                    errors.discount =
                        "The value must be greater than 0 or less than 100";
                }
                if (!images || (Array.isArray(images) && images.length === 0)) {
                    errors.images = "No images provided";
                }
                if (Object.keys(errors).length > 0) {
                    return responseReturn(res, 400, { errors });
                }

                if (!Array.isArray(images)) {
                    images = [images];
                }

                try {
                    let allImageUrl = [];
                    for (let i = 0; i < images.length; i++) {
                        if (images[i] && images[i].filepath) {
                            const result = await cloudinary.uploader.upload(
                                images[i].filepath,
                                {
                                    folder: "petProducts",
                                }
                            );
                            allImageUrl = [...allImageUrl, result.url];
                        }
                    }

                    await productModel.create({
                        caregiverId,
                        name,
                        category,
                        brand,
                        price,
                        stock,
                        discount,
                        short_description,
                        long_description,
                        slug: slugify(name),
                        images: allImageUrl,
                    });

                    responseReturn(res, 200, {
                        message: "Added product Successfully",
                    });
                } catch (error) {
                    console.log(error.message);
                    responseReturn(res, 404, {
                        error: "Bad Request",
                    });
                }
            }
        });
    };

    get_product = async (req, res) => {
        const { parPage, currentPage, searchValue } = req.query;
        const { id } = req;
        const skipPage = parseInt(parPage) * (parseInt(currentPage) - 1);
        try {
            if (searchValue) {
                const products = await productModel
                    .find({
                        $text: { $search: searchValue },
                        caregiverId: id,
                    })
                    .skip(skipPage)
                    .limit(parPage)
                    .sort({ createdAt: -1 });

                const totalProduct = await productModel
                    .find({
                        $text: { $search: searchValue },
                        caregiverId: id,
                    })
                    .countDocuments();
                responseReturn(res, 200, { products, totalProduct });
            } else {
                const products = await productModel
                    .find({
                        caregiverId: id,
                    })
                    .skip(skipPage)
                    .limit(parPage)
                    .sort({ createdAt: -1 });
                const totalProduct = await productModel
                    .find({
                        caregiverId: id,
                    })
                    .countDocuments();
                responseReturn(res, 200, { products, totalProduct });
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    get_product_id = async (req, res) => {
        const { productId } = req.params;

        try {
            const product = await productModel.findById(
                new ObjectId(productId)
            );

            const category = await categoryModel.findById(
                new ObjectId(product.category)
            );

            responseReturn(res, 200, {
                product,
                categoryByProductId: category,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    update_product = async (req, res) => {
        const form = formidable({ multiples: true });

        form.parse(req, async (err, fields, files) => {
            const {
                productId,
                name,
                category,
                brand,
                price,
                stock,
                discount,
                short_description,
                long_description,
                oldImage,
            } = fields;
            let { newImage } = files;

            const errors = {};

            if (!name) {
                errors.name = "Name is required";
            }
            if (!category) {
                errors.category = "category is required";
            }
            if (!brand) {
                errors.brand = "brand is required";
            }
            if (!short_description) {
                errors.short_description = "short_description is required";
            }
            if (!long_description) {
                errors.long_description = "long_description is required";
            }
            if (!price) {
                errors.price = "Price is required";
            } else if (isNaN(price)) {
                errors.price = "Price must be a number";
            }
            if (!stock) {
                errors.stock = "Stock is required";
            } else if (isNaN(stock)) {
                errors.stock = "Stock must be a number";
            }

            if (!discount) {
                errors.discount = "Discount is required";
            } else if (isNaN(discount)) {
                errors.discount = "Discount must be a number";
            }
            if (discount < 0 || discount > 100) {
                errors.discount =
                    "The value must be greater than 0 or less than 100";
            }

            if (Object.keys(errors).length > 0) {
                return responseReturn(res, 400, { errors });
            }

            try {
                cloudinary.config({
                    cloud_name: process.env.cloud_name,
                    api_key: process.env.api_key,
                    api_secret: process.env.api_secret,
                    secure: true,
                });

                const productCurrent = await productModel.findById(
                    new ObjectId(productId)
                );

                const updatedImages = productCurrent.images.filter((image) => {
                    if (Array.isArray(oldImage)) {
                        return !oldImage.includes(image);
                    } else {
                        return image !== oldImage;
                    }
                });

                for (const image of updatedImages) {
                    const oldImageId = image.split("/").pop().split(".")[0];
                    try {
                        await cloudinary.uploader.destroy(
                            `petProducts/${oldImageId}`
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
                                    folder: "petProducts",
                                }
                            );
                            newImageUrls.push(result.url);
                        }
                    }
                } else if (newImage && newImage.filepath) {
                    const result = await cloudinary.uploader.upload(
                        newImage.filepath,
                        {
                            folder: "petProducts",
                        }
                    );
                    newImageUrls.push(result.url);
                }

                const oldImageArray = Array.isArray(oldImage)
                    ? oldImage.filter(Boolean)
                    : oldImage
                    ? [oldImage]
                    : [];

                const finalImage = [...newImageUrls, ...oldImageArray].filter(
                    Boolean
                );

                await productModel.findByIdAndUpdate(productId, {
                    name,
                    category,
                    brand,
                    price,
                    stock,
                    discount,
                    short_description,
                    long_description,
                    images: finalImage,
                });
                responseReturn(res, 200, { message: "Updated Successfully" });
            } catch (error) {
                console.log(error.message);
            }
        });
    };

    delete_product = async (req, res) => {
        const { productId } = req.params;

        try {
            const product = await productModel.findById(
                new ObjectId(productId)
            );
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true,
            });
            for (const image of product.images) {
                const oldImageId = image.split("/").pop().split(".")[0];
                try {
                    await cloudinary.uploader.destroy(
                        `petProducts/${oldImageId}`
                    );
                } catch (removeError) {
                    console.error("Lỗi khi xóa ảnh cũ: ", removeError.message);
                }
            }
            await productModel.findByIdAndDelete(productId);
            responseReturn(res, 200, { message: "Deleted Successfully" });
        } catch (error) {
            console.log(error);
        }
    };

    update_status = async (req, res) => {
        const { status, id } = req.body;
        try {
            await productModel.findByIdAndUpdate(id, { status });
            responseReturn(res, 200, {
                message: "Updated Status Successfully",
            });
        } catch (error) {
            console.log(error.message);
        }
    };
}

module.exports = new productController();
