const { Schema, model } = require("mongoose");

const authServiceOrder = new Schema(
    {
        orderServiceId: {
            type: Schema.ObjectId,
            required: true,
        },
        caregiverId: {
            type: Schema.ObjectId,
            required: true,
        },
        service: {
            type: Object,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        payment_status: {
            type: String,
            default: "pending",
        },
        service_status: {
            type: String,
            default: "pending",
        },
        // days: {
        //     type: Number,
        //     required: true,
        // },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = model("authServiceOrder", authServiceOrder);
