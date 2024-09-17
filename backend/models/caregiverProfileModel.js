const mongoose = require("mongoose");
const { Schema } = mongoose;

const caregiverProfileSchema = new Schema(
    {
        caregiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
        },
        shopName: {
            type: String,
            default: "",
        },
        businessForm: {
            type: String,
            required: [true, "Business form is required"],
        },
        introduce: {
            type: String,
            default: "",
        },
        address: {
            type: String,
            required: [true, "Address is required"],
        },
        serviceArea: {
            type: [String],
            required: [true, "Service area is required"],
        },
        reasons: {
            type: String,
            required: [true, "Reasons for becoming a caregiver are required"],
        },
        experience: {
            type: String,
            required: [true, "Experience is required"],
        },
        certificates: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("caregiverProfile", caregiverProfileSchema);
