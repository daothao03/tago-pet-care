const { Schema, model } = require("mongoose");

const caregiverCustomerSchema = new Schema(
    {
        myId: {
            type: String,
            required: true,
        },
        myFriends: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = model("caregiver_customers", caregiverCustomerSchema);
