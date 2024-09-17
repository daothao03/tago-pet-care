const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [3, "Name must be at least 3 characters long"],
            maxlength: [50, "Name cannot exceed 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
        },
        image: {
            type: String,
            default: "",
        },
        role: {
            type: [String],
            enum: ["user", "admin", "caregiver"],
            default: ["user"],
        },
        method: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "pending",
        },
        payment: {
            type: String,
            default: "inactive",
        },
        isCaregiver: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

userSchema.index({
    name: "text",
});

module.exports = model("users", userSchema);
