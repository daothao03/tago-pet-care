const categoryModel = require("../../models/categoryModel");
const productModel = require("../../models/productModel");
const servicesModel = require("../../models/servicesModel");
const queryProducts = require("../../utils/queryProducts");
const { responseReturn } = require("../../utils/response");
const {
    mongo: { ObjectId },
} = require("mongoose");

class homeController {
    get_categories = async (req, res) => {
        const categories = await categoryModel.find({});
        responseReturn(res, 200, { categories });
    };

    get_price_range_product = async (req, res) => {
        const priceRange = {
            low: 0,
            high: 0,
        };
        const { type } = req.query;

        let product;
        if (type === "product") {
            product = await productModel.find({}).sort({ price: 1 });
        } else {
            product = await servicesModel.find({}).sort({ price: 1 });
        }

        if (product.length > 0) {
            priceRange.high = product[product.length - 1].price;
            priceRange.low = product[0].price;
        }
        responseReturn(res, 200, { priceRange });
    };

    query_products = async (req, res) => {
        const parPage = 9;
        req.query.parPage = parPage;

        try {
            if (req.query.category) {
                const category = await categoryModel.findOne({
                    slug: req.query.category,
                });

                if (category) {
                    req.query.categoryId = category._id;
                } else {
                    req.query.categoryId = null;
                }
            }

            const products = await productModel
                .find({})
                .sort({ createdAt: -1 })
                .populate({
                    path: "category",
                    select: "name",
                })
                .exec();

            const getProducts = new queryProducts(products, req.query)
                .categoryQuery()
                .priceQuery()
                .sortPriceQuery()
                .skip()
                .limit()
                .getProducts();

            const totalProduct = new queryProducts(products, req.query)
                .categoryQuery()
                .priceQuery()
                .sortPriceQuery()
                .countProducts();
            responseReturn(res, 200, { getProducts, totalProduct, parPage });
        } catch (error) {
            console.log(error.message);
        }
    };

    query_services = async (req, res) => {
        const parPage = 5;
        req.query.parPage = parPage;

        try {
            if (req.query.category) {
                const category = await categoryModel.findOne({
                    slug: req.query.category,
                });

                if (category) {
                    req.query.categoryId = category._id;
                } else {
                    req.query.categoryId = null;
                }
            }

            const services = await servicesModel
                .find({})
                .sort({ createdAt: -1 })
                .populate({
                    path: "category",
                    select: "name",
                })
                .exec();

            const getServices = new queryProducts(services, req.query)
                .categoryQuery()
                .priceQuery()
                .sortPriceQuery()
                .skip()
                .limit()
                .getProducts();

            const totalService = new queryProducts(services, req.query)
                .categoryQuery()
                .priceQuery()
                .sortPriceQuery()
                .countProducts();
            responseReturn(res, 200, {
                getServices,
                totalService,
                parPage,
            });
        } catch (error) {
            console.log(error.message);
        }
    };
}

module.exports = new homeController();
