import React from 'react'
import HeaderComponent from '../../../mainLayout/Header/HeaderComponent'
import CardServices from "./../../Dashboard/CardServices"
const UmrahService = () => {
  return (
    <>
    
    {/* <CardServices title={"Book Umrah Tickets"}/> */}
    <div className='topCardServices'>
    <HeaderComponent title={"Book Umrah Tickets"}/>
    <CardServices/>
         </div>
    </>
  )
}

export default UmrahService