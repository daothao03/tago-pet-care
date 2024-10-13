const { Schema, model } = require("mongoose");

const serviceOrderSchema = new Schema(
    {
        customerId: {
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
        petType: {
            type: String,
            required: true,
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
            type: String,
            required: true,
        },
        endDate: {
            type: String,
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
        serviceType: {
            type: String,
            enum: ["home", "store"],
            required: true,
        },
        travel_fee: {
            type: Number,
            default: 0,
        },
        address: {
            type: String,
            required: function () {
                return this.serviceType === "home";
            },
        },
    },
    { timestamps: true }
);

module.exports = model("serviceOrders", serviceOrderSchema);
