import React from 'react'
import HeaderComponent from '../../../mainLayout/Header/HeaderComponent'
import CardServices from "./../../Dashboard/CardServices"
const CargoService = () => {
  return (
    <>
    
    {/* <CardServices title={"Book Cargo Tickets"}/> */}
    <div className='topCardServices'>
    <HeaderComponent title={"Book Cargo Tickets"}/>
    <CardServices/>
         </div>
    </>
  )
}

export default CargoService