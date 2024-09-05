"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { updateProfile, fetchUser } from '@/actions/useractions'; // Adjust the import path as necessary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = () => {
  const { data: session, update } = useSession();
  const [formValues, setFormValues] = useState({
    name: ""
  });


  useEffect(() => {
    getdata();

  }, []);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    update()
    let a = await updateProfile(e, session.user.name);
    toast('DashBoard Updated', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  };

  const getdata = async () => {
    const u = await fetchUser(session.user.name);
    setFormValues(u);

  }

  return (

    <>   <ToastContainer
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
      <ToastContainer />    <div className="flex items-center justify-center min-h-screen">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-lg bg-slate-900 mx-12">
          <h1 className="text-2xl font-bold text-center text-white mb-6">Dashboard</h1>
          <form action={handleSubmit} className="space-y-4">
            {/* Input Fields */}
            <div className="relative flex items-center">
              <input
                id="name"
                name="name"
                type="text"
                value={formValues.name ? formValues.name : ''}
                onChange={handleChange}
                placeholder="Name"
                className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500 placeholder-transparent peer w-full"
              />
              <label
                htmlFor="name"
                className="absolute top-2 left-2 text-gray-500 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-0.75rem] peer-focus:scale-75"
              >
                name
              </label>
            </div>

            <div className="relative flex items-center">
              <input
                id="email"
                name="email"
                type="email"
                value={formValues.email ? formValues.email : ""}
                onChange={handleChange}
                placeholder="Email"
                className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500 placeholder-transparent peer w-full"
              />
              <label
                htmlFor="email"
                className="absolute top-2 left-2 text-gray-500 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-0.75rem] peer-focus:scale-75"
              >
                email
              </label>
            </div>

            <div className="relative flex items-center">
              <input
                id="username"
                name="username"
                type="text"
                value={formValues.username ? formValues.username : ""}
                onChange={handleChange}
                placeholder="Username"
                className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500 placeholder-transparent peer w-full"
              />
              <label
                htmlFor="username"
                className="absolute top-2 left-2 text-gray-500 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-0.75rem] peer-focus:scale-75"
              >
                username
              </label>
            </div>

            <div className="relative flex items-center">
              <input
                id="profilepic"
                name="profilepic"
                type="text"
                value={formValues.profilepic ? formValues.profilepic : ""}
                onChange={handleChange}
                placeholder="Profile Picture URL"
                className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500 placeholder-transparent peer w-full"
              />
              <label
                htmlFor="profilepic"
                className="absolute top-2 left-2 text-gray-500 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-0.75rem] peer-focus:scale-75"
              >
                Profilepic
              </label>
            </div>

            <div className="relative flex items-center">
              <input
                id="coverpic"
                name="coverpic"
                type="text"
                value={formValues.coverpic ? formValues.coverpic : ""}
                onChange={handleChange}
                placeholder="Cover Picture URL"
                className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500 placeholder-transparent peer w-full"
              />
              <label
                htmlFor="coverpic"
                className="absolute top-2 left-2 text-gray-500 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-0.75rem] peer-focus:scale-75"
              >
                Coverpic
              </label>
            </div>

            <div className="relative flex items-center">
              <input
                id="razorpayid"
                name="razorpayid"
                type="text"
                value={formValues.razorpayid ? formValues.razorpayid : ''}
                onChange={handleChange}
                placeholder="Razorpay ID"
                className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500 placeholder-transparent peer w-full"
              />
              <label
                htmlFor="razorpayid"
                className="absolute top-2 left-2 text-gray-500 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-0.75rem] peer-focus:scale-75"
              >
                razorpayid
              </label>
            </div>

            <div className="relative flex items-center">
              <input
                id="razorpaysecret"
                name="razorpaysecret"
                type="text"
                value={formValues.razorpaysecret ? formValues.razorpaysecret : ''}
                onChange={handleChange}
                placeholder="Razorpay Secret"
                className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500 placeholder-transparent peer w-full"
              />
              <label
                htmlFor="razorpaysecret"
                className="absolute top-2 left-2 text-gray-500 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-0.75rem] peer-focus:scale-75"
              >
                razorpaysecret
              </label>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>

  );
};

export default Dashboard;
