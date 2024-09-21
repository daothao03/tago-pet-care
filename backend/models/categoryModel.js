const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [3, "Name must be at least 3 characters long"],
            maxlength: [50, "Name cannot exceed 50 characters"],
        },
        image: {
            type: String,
            match: [
                /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/,
                "Please enter a valid image URL (must be a .jpg, .jpeg, .png, or .gif)",
            ],
        },
        slug: {
            type: String,
            required: [true, "Slug is required"],
            unique: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        type: {
            type: String,
            enum: ["product", "service"],
            required: [true, "Type is required"],
        },
    },
    {
        timestamps: true,
    }
);

categorySchema.index({
    name: "text",
});

module.exports = model("categories", categorySchema);
