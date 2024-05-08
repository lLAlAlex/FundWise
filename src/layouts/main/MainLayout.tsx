import Header from '@/components/navigations/Header'
import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

type Props = {
}

const MainLayout = (props: Props) => {
  return (
    <>
      <Header/>
      <main className="bg-background bg-page-gradient text-white pt-nav-height">
        <Outlet/>
      </main>
    </>
  )
}

export default MainLayout