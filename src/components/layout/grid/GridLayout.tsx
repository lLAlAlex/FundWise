import React from 'react'

const GridLayout = (props: React.AllHTMLAttributes<HTMLDivElement> ) => {
  return (
    <div className={`grid grid-cols-3 gap-2 lg:grid-cols-4 lg:gap-4 p-4 ${props.className}`} {...props}>
        {props.children}
    </div>
  )
}

export default GridLayout