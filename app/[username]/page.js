import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from 'next/navigation'
import connectDB from '@/db/connectDb'
import User from '@/models/User'

const page =  async ({params}) => {
  const checkpage = async ( ) => {
    await connectDB()
    let u = await User.findOne({ username: params.username })
    if (!u) {
      return notFound()

    }

  }
  await checkpage();
  return (
    <>
     <PaymentPage username= {params.username}/>
  
    </>
  )
}

export default page
export async function generateMetadata({ params }) {
  return {
    title: `${params.username} | Get me a Chai`,
  }
}
