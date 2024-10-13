const { Schema, model } = require("mongoose");
const caregiverWalletSchema = new Schema(
    {
        caregiverId: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);
module.exports = model("caregiverWallets", caregiverWalletSchema);
