"use client"
import React from 'react'
import { signOut } from 'next-auth/react'

const Signout = () => {
  return (
    <div>
        <button className='cursor-pointer' onClick={()=> signOut()}>Sign out</button>
    </div>
  )
}

export default Signout