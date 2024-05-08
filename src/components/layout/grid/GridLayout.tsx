import React, { ReactNode } from 'react'

const GridLayout = (props: {className?: string, children: ReactNode} ) => {
  return (
    <div id='grid_layout' className={`grid grid-cols-3 gap-2 lg:grid-cols-4 lg:gap-4 p-4 ${props.className}`}>
        {props.children}
    </div>
  )
}

export default GridLayout