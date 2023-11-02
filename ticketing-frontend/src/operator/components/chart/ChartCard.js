import React from 'react'

const Chart = ({ children, title }) => {
  return (
    <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
      <p className="mb-4 font-semibold text-gray-800">{title}</p>
      {children}
    </div>
  )
}

export default Chart
