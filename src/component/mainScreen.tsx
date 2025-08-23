import React from 'react'

// children
function MainScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full py-8 px-4 bg-gray-200 min-h-[90.2vh]">
      <div>{children}</div>
    </div>
  )
}

export default MainScreen;