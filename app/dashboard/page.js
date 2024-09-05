"use client"
import React, { useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import Dashboard from '@/components/Dashboard'

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading

    if (!session) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [session, status, router]);

  useEffect(() => {
    document.title = 'Dashboard | GetMeChai'; // Sets the document title
  }, []);

  // Render a loading state or nothing while redirecting
  if (status === "loading" || !session) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Dashboard />
    </>
  )
}

export default Page



