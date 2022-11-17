import React from 'react'
import Coininfo from '../components/Coininfo'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import '../App.css'
export default function CoinPage() {
  const {id}=useParams();
  return (
    <>
  
    <div>
        <Coininfo value={id}/>
    </div>
    <div className="headerdiv-1">
    <Header/>
    </div>
    </>
  )
}
