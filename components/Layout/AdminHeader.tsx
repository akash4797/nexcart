import React from 'react'
import Signout from './Signout'
const AdminHeader = () => {
  return (
    <div className='flex justify-between container mx-auto p-5'>
        <div className="">
            LOGO
        </div>
        <div className="">
            <Signout/>
        </div>
    </div>
  )
}

export default AdminHeader