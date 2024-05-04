import Header from '@/components/ui/Header'
import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

type Props = {
}

const MainLayout = (props: Props) => {
  return (
    <>
      <Header/>
      <main className='flex-1 bg-[#18191A] w-full text-white py-8 flex flex-col items-center'>
        <Outlet/>
      </main>
    </>
  )
}

export default MainLayout