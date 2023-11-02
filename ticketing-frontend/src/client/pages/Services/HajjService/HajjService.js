import React from 'react'
import HeaderComponent from '../../../mainLayout/Header/HeaderComponent'
import CardServices from "./../../Dashboard/CardServices"
const HajjService = () => {
  return (
    <>
    
    {/* <CardServices title={"Book Hajj Tickets"}/> */}
    <div className='topCardServices'>
    <HeaderComponent title={"Book Hajj Tickets"}/>
    <CardServices/>
         </div>
    </>
  )
}

export default HajjService