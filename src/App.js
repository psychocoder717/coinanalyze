import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import CoinPage from './Pages/CoinPage'

export default function App() {
  return (
    <>
<h1></h1>
<BrowserRouter>

<Routes>
{/* setup of route */}
<Route path="/" element={<HomePage/>}></Route>
<Route path="/coinsdata/:id" element={<CoinPage/>}></Route>{/* here use params access data of coin by its id  */}

  </Routes>
  
  </BrowserRouter>

    </>
  )
}
