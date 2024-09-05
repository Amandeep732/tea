"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Script from 'next/script';
import { Cormorant_Garamond } from 'next/font/google';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { fetchUser, fetchPayment, initiate, fetchPayments, updateProfile } from '@/actions/useractions';

const PaymentPage = ({ username }) => {
    const { data: Session, status } = useSession(); // Added status
    const [paymentForm, setPaymentForm] = useState({});
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const Router = useRouter();


    const handleChange = (e) => {
        setPaymentForm({
            ...paymentForm,
            [e.target.name]: e.target.value
        });

    };

    useEffect(() => {
        getData()

    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true" && Session) {
            toast('🦄Mange Mitter  Aage rupyee', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            Router.push(`/${username}`)
        }
    }, [])



    const getData = async () => {
        let u = await fetchUser(username)
        setcurrentUser(u)
        let dbPayments = await fetchPayments(username)
        setPayments(dbPayments)


    }


    const pay = async (amount) => {
        if (!Session || !Session.user) {
            console.error('Session data is missing');
            return;
        }

        console.log(`This is ${Session.user.name}`); // Debugging
        let a = await initiate(amount, username, paymentForm);
        let orderId = a.id;
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai", // Your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}api/razorpay`,
            "prefill": {
                "name": paymentForm.name || "Your Name",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }

        };

        let rzp1 = new Razorpay(options)
        rzp1.open();

    }


    // Check Session status
    if (status === "loading") return <p>Loading...</p>;
    if (status === "unauthenticated") return <p>Please log in to continue.</p>;

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            <ToastContainer />

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


            <div className='relative w-full cover'>
                <img className='object-cover w-full h-48 md:h-[350] ' src={currentUser.coverpic} alt="" />
                <div className='absolute -bottom-16  right-[32%] md:right-[45%] overflow-hidden size-36'>
                    <img width={128} height={128} className='rounded-full object-cover size-36 border border-white' src={currentUser.profilepic} alt="user image" />
                </div>
            </div>
            <div className="flex justify-center items-center mt-16 gap-3 flex-col">
                <p className='font-bold '>@{username}</p>
                <p className='text-slate-400'>Lets Helps {username} to Gets a chai</p>
                {/* calculated the all payments sum and how much payments done by user */}
                <p className='text-slate-400'>
                    Total : <b> {payments.length}</b> Payments. <b> Raised ₹ {payments.reduce((a, b) => a + b.amount, 0)}</b>

                </p>
            </div>

            <div className='flex md:flex-row flex-col gap-2 justify-center mt-6'>
                {/* first */}
                <div className='bg-slate-900 md:w-[45vw] mx-6 md:mx-0 md:p-10 p-5 rounded-lg '>
                    <h1 className='text-bold text-2xl font-bold'>Supporters</h1>
                    <div className='all m-2'>
                        {payments.length === 0 && <li>No Payments yets</li>}
                        <div className='hold'>

                            {payments.map((p, i) => {
                                return (
                                    <div key={i} className="flex gap-2 p-4">
                                        <img className='invert' src="user.svg" alt="" />
                                        <span>{p.name} Send<b> ₹{p.amount}</b> with a Message : {p.message}</span>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Repeat for other supporters */}
                    </div>
                </div>
                {/* second */}
                <div className='bg-slate-900  rounded-lg md:w-[45vw] mx-6 md:mx-0 md:p-10 p-5 '>
                    <h1 className='text-2xl font-bold'>Make a Payment</h1>
                    <div className="flex flex-col gap-2 p-4">
                        <input
                            onChange={handleChange}
                            value={paymentForm.name || ''} // Ensure default value is ''
                            name='name'
                            placeholder='Enter Name'
                            className='bg-slate-800 p-3 w-full rounded-lg'
                            type="text"
                        />
                        <input
                            onChange={handleChange}
                            value={paymentForm.message || ''} // Ensure default value is ''
                            name='message'
                            placeholder='Enter Message'
                            className='bg-slate-800 p-3 w-full rounded-lg'
                            type="text"
                        />
                        <input
                            onChange={handleChange}
                            value={paymentForm.amount || ''} // Ensure default value is ''
                            name='amount'
                            placeholder='Enter Amount'
                            className='bg-slate-800 p-3 w-full rounded-lg'
                            type="text"
                        />

                        <button disabled={paymentForm.name?.length < 3 || paymentForm.message?.length < 4} onClick={() => pay(Number.parseInt(paymentForm.amount) * 100)} className=" disabled:bg-white relative w-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 ">
                            <span className="relative px-5 py-2.5 w-full transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Pay Now
                            </span>
                        </button>
                    </div>

                    <div className='flex gap-2 md:flex-row flex-col p-4 '>
                        <button className='bg-slate-800 p-3 hover:bg-slate-700 rounded' onClick={() => pay(1000)}>Pay ₹10</button>
                        <button className='bg-slate-800 p-3 hover:bg-slate-700 rounded' onClick={() => pay(2000)}>Pay ₹20</button>
                        <button className='bg-slate-800 p-3 hover:bg-slate-700 rounded' onClick={() => pay(3000)}>Pay ₹30</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;
