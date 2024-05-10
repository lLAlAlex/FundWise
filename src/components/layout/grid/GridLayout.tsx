import React, { ReactNode } from 'react'

const GridLayout = (props: {className?: string, children: ReactNode} ) => {
  return (
    <div id='grid_layout' className={`grid grid-cols-2 gap-4 px-10 p-4 md:grid-cols-3 md:gap-x-10 md:px-20 xl:grid-cols-4 ${props.className}`}>
        {props.children}
    </div>
  )
}

export default GridLayout