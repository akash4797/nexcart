import React from 'react'
import { getServerSession } from 'next-auth'
import Signout from '@/components/Layout/Signout'

const Dashboard = async () => {
  const session = await getServerSession()
  return (
    <>
    <div className='text-2xl'>Welcome, {session?.user.name}</div>
    <Signout />
    </>
  )
}

export default Dashboard