import React from 'react'
import HeaderComponent from '../../../mainLayout/Header/HeaderComponent'
import CardServices from "./../../Dashboard/CardServices"
const TourismService = () => {
  return (
    <>
    
    {/* <CardServices title={"Book Tourism Tickets"}/> */}
    <div className='topCardServices'>

      <HeaderComponent title={"Book Tourism Tickets"}/>
      <CardServices/>
         </div>

    </>
  )
}

export default TourismService