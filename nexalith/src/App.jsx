import { useState } from 'react'

import './App.css'
import BarChart from './components/BarChart'

function App() {
  

  return (
    <>
       <div className="bg-purple-200 lg:h-[800px] min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <BarChart />
      </div>
    </div>
    </>
  )
}

export default App
