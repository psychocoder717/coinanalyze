import React from 'react'
import Header from '../components/Header'
import '../App.css'
import CoinsTable from '../components/CoinsTable'


export default function HomePage() {
  return (
    <>
 <div className="headerdiv">
   <Header/>
   </div>
<div className="coinlist">
<CoinsTable/>
  </div>
  
    </>
  )
}
