"use client"
import { React, useState } from 'react'
import Link from 'next/link'
import { useSession, signOut, signIn } from "next-auth/react"




const Navbar = () => {
  const { data: session } = useSession();
  const [dropdown, setdropdown] = useState(false)

  return (
    <nav className='bg-black text-white flex flex-col md:flex-row md:px-6 md:h-16 items-center md:w-full justify-between'>


      <Link href={'/'} className="logo flex justify-center items-center ">
        <img className='pb-4' width={40} src="tea.gif" alt="" />
        <h2 className='font-bold text-xl '>GetMeAchai</h2>
      </Link>

      <div className='flex items-start'>
        {session && <><button onClick={() => { setdropdown(!dropdown) }} onBlur={() => {
          setTimeout(() => {
            setdropdown(false)
          }, 100);
        }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white  mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome  {session.user.email}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>
          <div id="dropdown" className={`z-10 ${dropdown ? "" : "hidden"} absolute top-28 right-28 md:absolute md:top-14 md:right-32 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
            <ul className=" text-sm  text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href="/dashboard" className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link href={`${session.user.name}`} className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
              </li>

              <li>
                <Link onClick={() => { signOut() }} href="#" className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
              </li>
            </ul>
          </div></>
        }




        {session && <button onClick={() => { signOut() }} className="relative inline-flex items-start justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Log out
          </span>
        </button>}
        {!session && <Link href={"/login"}>
          <button className="relative inline-flex items-center justify-start p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Log in
            </span>
          </button>
        </Link>
        }
      </div>
    </nav>
  )
}

export default Navbar