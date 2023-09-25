import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Chat from './pages/Chat'
import Setup from './pages/Setup'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/setUp' element={<Setup />} />
        <Route path='/' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}
