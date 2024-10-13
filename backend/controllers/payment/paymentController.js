const stripeModel = require("../../models/stripeModel");
const userModel = require("../../models/userModel");
const caregiverWallet = require("../../models/caregiverWallet");
const myShopWallet = require("../../models/myShopWallet");
const withdrawRequest = require("../../models/withdrawRequest");

const { v4: uuidv4 } = require("uuid");
const { responseReturn } = require("../../utils/response");
const {
    mongo: { ObjectId },
} = require("mongoose");

const stripe = require("stripe")(
    "sk_test_51Q8NjKFNCE4AaJd4rsMgLUW1lzGnwhZDlj4kGV4DSNup4QuXIPno9wt4Roq5TcqbfOt9y283Oymw3dRDcUqcDw4l00IE2Se5wu"
);

class paymentController {
    create_stripe_connect_account = async (req, res) => {
        const { id } = req;
        const uid = uuidv4();

        try {
            const stripeInfo = await stripeModel.findOne({ caregiverId: id });
            if (stripeInfo) {
                await stripeModel.deleteOne({ caregiverId: id });
                const account = await stripe.accounts.create({
                    type: "express",
                });
                const accountLink = await stripe.accountLinks.create({
                    account: account.id,
                    refresh_url: "http://localhost:5173/refresh",
                    return_url: `http://localhost:5173/success?activeCode=${uid}`,
                    type: "account_onboarding",
                });
                await stripeModel.create({
                    caregiverId: id,
                    stripeId: account.id,
                    code: uid,
                });
                responseReturn(res, 201, { url: accountLink.url });
            } else {
                const account = await stripe.accounts.create({
                    type: "express",
                });
                const accountLink = await stripe.accountLinks.create({
                    account: account.id,
                    refresh_url: "http://localhost:5173/refresh",
                    return_url: `http://localhost:5173/success?activeCode=${uid}`,
                    type: "account_onboarding",
                });
                await stripeModel.create({
                    caregiverId: id,
                    stripeId: account.id,
                    code: uid,
                });
                responseReturn(res, 201, { url: accountLink.url });
            }
        } catch (error) {
            console.log("stripe connect account error:" + error.message);
        }
    };

    active_stripe_connect_account = async (req, res) => {
        const { activeCode } = req.params;
        const { id } = req;
        try {
            const userStripeInfo = await stripeModel.findOne({
                code: activeCode,
            });
            if (userStripeInfo) {
                await userModel.findByIdAndUpdate(id, {
                    payment: "active",
                });
                responseReturn(res, 200, { message: "payment Active" });
            } else {
                responseReturn(res, 404, { message: "payment Active Fails" });
            }
        } catch (error) {
            responseReturn(res, 500, { message: "Internal Server Error" });
        }
    };

    create_payment = async (req, res) => {
        const { price } = req.body;

        try {
            console.log("end create_payment");
            const payment = await stripe.paymentIntents.create({
                amount: price,
                currency: "vnd",
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            console.log("end create_payment");

            responseReturn(res, 200, { clientSecret: payment.client_secret });
        } catch (error) {
            console.log(error.message);
        }
    };

    sum_amount = (data) => {
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
            sum += data[i].amount;
        }
        return sum;
    };

    get_seller_payment_details = async (req, res) => {
        const { caregiverId } = req.params;

        try {
            const payments = await caregiverWallet.find({ caregiverId });

            const pendingWithdraws = await withdrawRequest.find({
                $and: [
                    {
                        caregiverId: {
                            $eq: caregiverId,
                        },
                    },
                    {
                        status: {
                            $eq: "pending",
                        },
                    },
                ],
            });

            const successWithdraws = await withdrawRequest.find({
                $and: [
                    {
                        caregiverId: {
                            $eq: caregiverId,
                        },
                    },
                    {
                        status: {
                            $eq: "success",
                        },
                    },
                ],
            });
            const withdrawAmount = this.sum_amount(successWithdraws);
            const pendingAmount = this.sum_amount(pendingWithdraws);
            const totalAmount = this.sum_amount(payments);

            let availableAmount = 0;
            if (totalAmount > 0) {
                availableAmount =
                    totalAmount - (pendingAmount + withdrawAmount);
            }

            responseReturn(res, 200, {
                pendingWithdraws,
                successWithdraws,
                totalAmount,
                withdrawAmount,
                pendingAmount,
                availableAmount,
            });
        } catch (error) {
            console.error();
        }
    };

    withdrawal_request = async (req, res) => {
        const { amount, caregiverId } = req.body;
        try {
            const withdrawal = await withdrawRequest.create({
                caregiverId,
                amount: parseInt(amount),
            });
            responseReturn(res, 200, {
                withdrawal,
                message: "Withdrawal Request Send",
            });
        } catch (error) {
            responseReturn(res, 500, { message: "Internal Server Error" });
        }
    };

    get_payment_request = async (req, res) => {
        try {
            const withdrawalRequest = await withdrawRequest.find({
                status: "pending",
            });
            responseReturn(res, 200, { withdrawalRequest });
        } catch (error) {
            responseReturn(res, 500, { message: "Internal Server Error" });
        }
    };

    confirm_request_payment = async (req, res) => {
        const { paymentId } = req.body;

        try {
            const payment = await withdrawRequest.findById(paymentId);
            const { stripeId } = await stripeModel.findOne({
                caregiverId: new ObjectId(payment.caregiverId),
            });

            const exchangeRate = 24000;
            const amountInUSD = payment.amount / exchangeRate;
            const amountInCents = Math.round(amountInUSD * 100);

            await stripe.transfers.create({
                amount: amountInCents,
                currency: "usd",
                destination: stripeId,
            });

            await withdrawRequest.findByIdAndUpdate(paymentId, {
                status: "success",
            });

            responseReturn(res, 200, {
                payment,
                message: "Request Confirm Success",
            });
        } catch (error) {
            console.log(error.message);
            responseReturn(res, 500, { message: "Internal Server Error" });
        }
    };
}

module.exports = new paymentController();
