import React from 'react'

const Footer = () => {
   const currentYear = new Date().getFullYear()
  return (
     <footer className=' text-white flex-col md:flex-row p-4 bg-gray-950 flex justify-between md:px-12'>
         <div className="flex flex-col space-y-8  h-34 ">
         <div className='flex flex-col  gap-2 text-center'>
         CopyRight &copy; {currentYear} Get Me A Chai | All rights reserved!!
         
         <div className='flex gap-1 text-gray-500 text-sm items-center justify-center'>
         <p className='flex'>Made by Kunwar Achal Rana with</p><img  width={21}  src="heart.png" alt="" />
         </div>
      </div>
           <div className="links text-white  flex gap-2 md:flex-row flex-col text-center ">
              <a className='hover:underline' href="/about us">About Us
              </a>
              <a className='hover:underline' href="/ contact us">Contact Us
              </a>
              <a className='hover:underline' href="/Privacy Policy">Privacy Policy
              </a>
              <a className='hover:underline' href="/Terms & Conditions">Terms & Conditions</a>
              <a className='hover:underline' href="/Cancellation/Policies">
              Cancellation/Refund Policies</a>
           </div>
          </div>
          <div className='' >
               <div className='text-center p-4'>Follow On Me</div>
               <div className='flex gap-5 justify-center items-center'>
               <button className='border hover:bg-slate-600  px-5 border-white p-2 rounded-full '>GitHub</button>
               <button className='border hover:bg-slate-600  px-5 border-white p-2 rounded-full'>LinkedIN</button>
               </div>
            </div>

     </footer>
  )
}

export default Footer