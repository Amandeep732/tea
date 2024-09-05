"use server"

import connectDB from "@/db/connectDb";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import User from "@/models/User";



export const initiate = async (amount, to_username, paymentForm) => {
    try {
        // Connect to MongoDB
        await connectDB();
        // fetch the secret of the user who is geeting paymant
        const user = await User.findOne({ username: to_username })
        let secret = user.razorpaysecret
        var instance = new Razorpay({
            key_id: user.razorpayid,
            key_secret: secret
        });

        let options = {
            amount: Number.parseInt(amount),
            currency: 'INR',
            receipt: `receipt_${Date.now()}` // Optional: You can add a unique receipt number
        };

        let x = await instance.orders.create(options);

        // Create a payment object to show the pending payment in the database
        await Payment.create({
            oid: x.id,
            amount: amount / 100,
            to_user: to_username,
            name: paymentForm.name || 'Default Name',
            message: paymentForm.message
        });

        return x;
    } catch (error) {
        console.error("Error initiating payment:", error);
        throw new Error("Payment initiation failed.");
    }
};

export const fetchUser = async (username) => {
    await connectDB()
    let u = await User.findOne({ username: username })
    let user = u.toObject({ flattenObjectIds: true })
    return user

}
export const fetchPayments = async (username) => {
    await connectDB()
    // find all the payment sorted by decresing  order of amounts and flattern object
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean()

    return p;
}


export const updateProfile = async (data, Oldusername) => {
    await connectDB();

    let ndata = Object.fromEntries(data)


    // Agar user update ho raha hai, check karo ki username available hai ya nahi
    if (Oldusername !== ndata.username) {
        let existingUser = await User.findOne({ username: ndata.username });
        if (existingUser) {
            throw new Error('Username already exists');
        }
        await User.updateOne({ email: ndata.email }, ndata);
        await Payment.updateMany({to_user:Oldusername}, {to_user: ndata.username})
    }
    else {
        await User.updateOne({ email: ndata.email }, ndata);
    }
};

