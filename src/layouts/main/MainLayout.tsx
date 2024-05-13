import Header from '@/components/navigations/Header'
import Footer from '@/components/ui/Footer'
import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

type Props = {
}

const MainLayout = (props: Props) => {
  return (
    <>
      <Header/>
      <main className="bg-background text-black pt-nav-height flex-1">
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}

export default MainLayout