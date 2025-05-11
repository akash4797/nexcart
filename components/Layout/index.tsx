"use client"
import React from 'react'
import Header from './Header'
import AdminHeader from './Admin/Header'
import { usePathname } from 'next/navigation'

const Layout = ({children}:{children: React.ReactNode}) => {
  const pathname = usePathname()

  if (pathname.includes('auth')) {
    return children
  }

  if(pathname.includes('admin')){
    return (
      <>
        <AdminHeader/>
        {children}
      </>
    )
  }

  return (
    <>
      <Header/>
      {children}
    </>
  )
}

export default Layout