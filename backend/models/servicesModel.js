const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new Schema(
    {
        caregiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        name: {
            type: String,
            required: true,
            minlength: 3,
        },
        slug: {
            type: String,
            lowercase: true,
            unique: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "categories",
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        short_description: {
            type: String,
            required: true,
        },
        long_description: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            required: true,
        },
        status: {
            type: String,
            default: "active",
        },
        rating: {
            type: Number,
            default: 0,
        },
        complete_time: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

serviceSchema.index(
    {
        name: "text",
        category: "text",
        description: "text",
    },
    {
        weights: {
            name: 5,
            category: 4,
            description: 1,
        },
    }
);

module.exports = mongoose.model("services", serviceSchema);
