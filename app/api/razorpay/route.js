import { NextResponse } from "next/server";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import connectDB from "@/db/connectDb";
import User from "@/models/User";


export const POST = async (req) => {
   await connectDB()
   let body = await req.formData()
   body = Object.fromEntries(body)



   let p = await Payment.findOne({ oid: body.razorpay_order_id })
   // check if razorpay id exists in the server  
   if (!p) {
      return NextResponse.json({ success: false, message: "Order ID is Not found" })
   }

   // fetch the secret of the user who is geeting paymant
   const user = await User.findOne({ username: p.to_user })
   let secret = user.razorpaysecret

   // verfy the payment 
   let xx = validatePaymentVerification({ "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature, secret)

   if (xx) {
      //update the payment status
      const updatedPayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: "true" },
         { new: true })
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)

   }
   else {
      return NextResponse.json({ success: false, message: "Invaild payment" })
   }
}